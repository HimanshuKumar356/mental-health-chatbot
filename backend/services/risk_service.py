# services/risk_service.py

HIGH_RISK_PHRASES = [
    "suicide",
    "kill myself",
    "end my life",
    "want to die",
    "can't go on",
    "i might hurt myself",
    "i will kill myself",
    "no reason to live",
]

NEGATIVE_EMOTIONS = {
    "sadness",
    "fear",
    "anger",
    "disgust",
}


def detect_risk(text: str, sentiment="neutral", emotion="neutral"):

    text = text.lower()

    if any(phrase in text for phrase in HIGH_RISK_PHRASES):
        return "high"

    if sentiment == "negative" and emotion in NEGATIVE_EMOTIONS:
        return "medium"

    return "low"


def classify_state(text: str, emotion="neutral"):

    text = text.lower()

    if any(
        word in text
        for word in [
            "worried",
            "nervous",
            "anxious",
            "panic",
        ]
    ):
        return "anxious"

    if any(
        word in text
        for word in [
            "tired",
            "burned out",
            "overwhelmed",
            "stressed",
        ]
    ):
        return "stressed"

    if any(
        word in text
        for word in [
            "sad",
            "empty",
            "worthless",
            "hopeless",
            "low",
        ]
    ):
        return "low_mood"

    if emotion == "sadness":
        return "low_mood"

    if emotion == "fear":
        return "anxious"

    return "neutral_or_mixed"