import re
from collections import Counter


STOPWORDS = {
    "the", "is", "are", "a", "an", "and", "or", "of", "to", "in", "on", "for",
    "with", "as", "by", "at", "from", "this", "that", "it", "be", "was", "were",
    "can", "will", "has", "have", "had", "but", "not", "we", "you", "they",
    "their", "our", "your", "into", "also", "than", "then", "so", "if", "its",
    "these", "those", "such", "using", "used", "use", "based", "may", "many",
    "more", "most", "some", "each", "between", "within", "without", "about"
}

IMPORTANT_STUDY_WORDS = {
    "concept", "definition", "important", "purpose", "advantage", "disadvantage",
    "process", "method", "example", "model", "system", "data", "analysis",
    "learning", "algorithm", "performance", "feature", "result", "problem",
    "solution", "objective", "class", "object", "inheritance", "encapsulation",
    "polymorphism"
}


def clean_text(text: str) -> str:
    text = text.replace("\n", " ")
    text = re.sub(r"--- Page \d+ ---", " ", text)
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"([A-Z])\s(?=[A-Z]\s)", r"\1", text)
    return text.strip()


def split_sentences(text: str):
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())

    cleaned_sentences = []
    seen = set()

    for sentence in sentences:
        sentence = sentence.strip()

        if len(sentence) < 35:
            continue

        if len(sentence.split()) < 6:
            continue

        normalized = sentence.lower()

        if normalized in seen:
            continue

        seen.add(normalized)
        cleaned_sentences.append(sentence)

    return cleaned_sentences


def clean_words(text: str):
    words = re.findall(r"\b[a-zA-Z]{3,}\b", text.lower())
    return [word for word in words if word not in STOPWORDS]


def get_top_keywords(text: str, limit: int = 5):
    words = clean_words(text)
    counter = Counter(words)

    common_words = [
        word for word, _ in counter.most_common(limit)
    ]

    return common_words


def score_sentence(sentence: str, word_frequency: Counter, index: int, total_sentences: int):
    sentence_words = clean_words(sentence)

    if not sentence_words:
        return 0

    keyword_score = sum(word_frequency.get(word, 0) for word in sentence_words)
    keyword_score = keyword_score / len(sentence_words)

    position_score = 0
    if index == 0:
        position_score += 2
    elif index < max(2, total_sentences * 0.2):
        position_score += 1

    study_word_score = 0
    for word in sentence_words:
        if word in IMPORTANT_STUDY_WORDS:
            study_word_score += 1.5

    length_penalty = 0
    if len(sentence_words) > 35:
        length_penalty = 1

    return keyword_score + position_score + study_word_score - length_penalty


def generate_rule_based_summary(text: str, max_sentences: int = 5):
    if not text or not text.strip():
        raise ValueError("Text is required for summary generation")

    cleaned_text = clean_text(text)
    sentences = split_sentences(cleaned_text)
    word_count = len(cleaned_text.split())

    if not sentences:
        short_preview = cleaned_text[:500]
        return {
            "summary": short_preview,
            "keyPoints": [short_preview],
            "sentenceCount": 1,
            "wordCount": word_count,
            "message": "Text was too short, so a short preview was returned."
        }

    words = clean_words(cleaned_text)
    word_frequency = Counter(words)
    top_keywords = get_top_keywords(cleaned_text, limit=5)

    scored_sentences = []

    for index, sentence in enumerate(sentences):
        score = score_sentence(
            sentence=sentence,
            word_frequency=word_frequency,
            index=index,
            total_sentences=len(sentences)
        )

        scored_sentences.append((score, index, sentence))

    ranked_sentences = sorted(scored_sentences, key=lambda item: item[0], reverse=True)

    selected = ranked_sentences[:max_sentences]

    # Always keep first useful sentence if it looks introductory
    first_sentence = sentences[0]
    if first_sentence not in [item[2] for item in selected] and len(first_sentence.split()) >= 8:
        selected.append((999, 0, first_sentence))

    selected = sorted(selected, key=lambda item: item[1])
    selected_sentences = [sentence for _, _, sentence in selected[:max_sentences]]

    if top_keywords:
        overview = f"This study material mainly discusses {', '.join(top_keywords[:4])}."
    else:
        overview = "This study material introduces the main ideas and important concepts from the provided text."

    key_points = selected_sentences[:5]

    summary_text = overview + " " + " ".join(selected_sentences)

    return {
        "summary": summary_text,
        "keyPoints": key_points,
        "sentenceCount": len(sentences),
        "wordCount": word_count,
        "message": "Summary generated successfully"
    }