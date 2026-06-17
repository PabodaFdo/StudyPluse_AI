from pathlib import Path

import joblib
import pandas as pd


BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "weak_topic_model.pkl"
ENCODER_PATH = BASE_DIR / "models" / "weak_topic_label_encoder.pkl"


def load_weak_topic_model():
    if MODEL_PATH.exists() and ENCODER_PATH.exists():
        model = joblib.load(MODEL_PATH)
        encoder = joblib.load(ENCODER_PATH)
        return model, encoder

    return None, None


weak_topic_model, weak_topic_encoder = load_weak_topic_model()


def analyze_weak_topic_rule_based(data):
    reasons = []
    recommendations = []

    if data.quizScore < 55:
        reasons.append("Quiz score is below the expected level")
        recommendations.append("Revise this topic using short notes and examples")

    if data.wrongAnswers >= 6:
        reasons.append("Wrong answer count is high")
        recommendations.append("Review the questions you answered incorrectly")

    if data.attemptCount <= 1:
        reasons.append("Topic has not been practiced enough")
        recommendations.append("Attempt at least one more quiz after revision")

    if data.timeSpentMinutes < 30:
        reasons.append("Time spent on this topic is low")
        recommendations.append("Spend at least 30 focused minutes on this topic")

    if data.daysSinceLastStudy >= 7:
        reasons.append("Topic has not been studied recently")
        recommendations.append("Schedule this topic for revision this week")

    if data.confidenceLevel <= 2:
        reasons.append("Confidence level is low")
        recommendations.append("Use flashcards to build confidence in key concepts")

    if data.topicDifficulty >= 4:
        reasons.append("Topic difficulty is high")
        recommendations.append("Break the topic into smaller subtopics and revise step by step")

    if not reasons:
        reasons.append("Topic indicators are currently stable")

    if not recommendations:
        recommendations.append("Maintain regular practice for this topic")

    return reasons, recommendations


def predict_weak_topic(data):
    reasons, recommendations = analyze_weak_topic_rule_based(data)

    # Fallback if model files are missing
    if weak_topic_model is None or weak_topic_encoder is None:
        if data.quizScore >= 75 and data.wrongAnswers <= 3:
            topic_status = "Strong"
            confidence = 0.75
        elif data.quizScore >= 55:
            topic_status = "Moderate"
            confidence = 0.70
        else:
            topic_status = "Weak"
            confidence = 0.80

        return {
            "topicName": data.topicName,
            "topicStatus": topic_status,
            "confidence": confidence,
            "reasons": reasons,
            "recommendations": recommendations,
        }

    features = pd.DataFrame([{
        "quizScore": data.quizScore,
        "wrongAnswers": data.wrongAnswers,
        "attemptCount": data.attemptCount,
        "timeSpentMinutes": data.timeSpentMinutes,
        "daysSinceLastStudy": data.daysSinceLastStudy,
        "confidenceLevel": data.confidenceLevel,
        "topicDifficulty": data.topicDifficulty,
    }])

    prediction = weak_topic_model.predict(features)[0]
    probabilities = weak_topic_model.predict_proba(features)[0]

    topic_status = weak_topic_encoder.inverse_transform([prediction])[0]
    confidence = float(max(probabilities))

    return {
        "topicName": data.topicName,
        "topicStatus": topic_status,
        "confidence": round(confidence, 2),
        "reasons": reasons,
        "recommendations": recommendations,
    }