import os
import re
import json
from dotenv import load_dotenv
from typing import Dict, Any, List

try:
    from groq import Groq
except ImportError:
    Groq = None

from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")

def clean_pdf_text(text: str) -> str:
    text = text.replace("\n", " ")
    text = re.sub(r"--- Page \d+ ---", " ", text)
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"([A-Z])\s(?=[A-Z]\s)", r"\1", text)
    return text.strip()

def split_into_sentences(text: str) -> List[str]:
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    cleaned = []
    for s in sentences:
        s = s.strip()
        if len(s) > 30 and len(s.split()) >= 5:
            cleaned.append(s)
    return cleaned

def generate_tfidf_fallback_summary(text: str) -> Dict[str, Any]:
    cleaned_text = clean_pdf_text(text)
    sentences = split_into_sentences(cleaned_text)
    word_count = len(cleaned_text.split())
    
    if len(sentences) < 3:
        return {
            "success": True,
            "source": "fallback",
            "main_summary": cleaned_text[:500],
            "important_points": [s for s in sentences],
            "key_terms": [],
            "word_count": word_count,
            "message": "Groq unavailable. Generated using fallback summary."
        }
        
    try:
        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = vectorizer.fit_transform(sentences)
        scores = np.array(tfidf_matrix.sum(axis=1)).flatten()
        
        ranked_indices = scores.argsort()[::-1]
        top_indices = ranked_indices[:min(5, len(sentences))]
        
        # Sort indices to keep original order
        top_indices = sorted(top_indices)
        
        selected_sentences = [sentences[i] for i in top_indices]
        main_summary = " ".join(selected_sentences)
        important_points = selected_sentences[:3]
        
        # Extract some basic key terms
        feature_names = vectorizer.get_feature_names_out()
        tfidf_scores = np.array(tfidf_matrix.sum(axis=0)).flatten()
        top_term_indices = tfidf_scores.argsort()[::-1][:5]
        key_terms = [feature_names[i] for i in top_term_indices]
        
    except Exception as e:
        print(f"TF-IDF failed: {e}")
        main_summary = cleaned_text[:500]
        important_points = [cleaned_text[:200]]
        key_terms = []
        
    return {
        "success": True,
        "source": "fallback",
        "main_summary": main_summary,
        "important_points": important_points,
        "key_terms": key_terms,
        "word_count": word_count,
        "message": "Groq unavailable. Generated using fallback summary."
    }

def generate_groq_summary(text: str) -> Dict[str, Any]:
    if not Groq or not GROQ_API_KEY:
        raise ValueError("Groq API not configured")
        
    cleaned_text = clean_pdf_text(text)
    word_count = len(cleaned_text.split())
    
    max_words = 4000
    if word_count > max_words:
        cleaned_text = " ".join(cleaned_text.split()[:max_words])
        
    client = Groq(api_key=GROQ_API_KEY)
    
    prompt = f"""
Summarize the following study material. 
Return ONLY a valid JSON object matching exactly this structure, with no markdown, no comments, and no extra text:
{{
  "main_summary": "A clear, student-friendly 3-4 sentence summary of the main topics.",
  "important_points": ["Point 1", "Point 2", "Point 3", "Point 4"],
  "key_terms": ["Term1", "Term2", "Term3", "Term4"]
}}

Rules:
- Keep original meaning correct.
- Do not invent facts.
- Do not remove important definitions.
- Keep important types, examples, steps, and technical terms.
- Use simple student-friendly English.
- If the PDF text is messy, summarize only the clear parts.

Text to summarize:
{cleaned_text}
"""
    
    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=1000,
        response_format={"type": "json_object"}
    )
    
    response_content = response.choices[0].message.content
    result_data = json.loads(response_content)
    
    return {
        "success": True,
        "source": "groq",
        "main_summary": result_data.get("main_summary", ""),
        "important_points": result_data.get("important_points", []),
        "key_terms": result_data.get("key_terms", []),
        "word_count": word_count,
        "message": "Generated using Groq"
    }

def generate_summary(text: str) -> Dict[str, Any]:
    if not text or not text.strip():
        raise ValueError("Text is required for summary generation")
        
    try:
        return generate_groq_summary(text)
    except Exception as e:
        print(f"Groq summary failed: {e}")
        return generate_tfidf_fallback_summary(text)