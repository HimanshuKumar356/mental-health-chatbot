from extensions import db
from models.mood import MoodEntry
from collections import Counter


def save_mood(user_id, mood, note=None):
    mood_entry = MoodEntry(
        user_id=user_id,
        mood=mood,
        note=note
    )

    db.session.add(mood_entry)
    db.session.commit()

    return mood_entry

def get_mood_history(user_id):
    """
    Returns all mood entries for a user,
    newest first.
    """

    moods = (
        MoodEntry.query
        .filter_by(user_id=user_id)
        .order_by(MoodEntry.created_at.desc())
        .all()
    )

    return moods

def get_mood_statistics(user_id):
    """
    Generate mood statistics for dashboard.
    """

    moods = (
        MoodEntry.query
        .filter_by(user_id=user_id)
        .order_by(MoodEntry.created_at.desc())
        .all()
    )
    MOOD_SCORES = {
    "Happy": 5,
    "Calm": 4,
    "Neutral": 3,
    "Sad": 2,
    "Stressed": 1,
    "Anxious": 1,
    "Angry": 1
    }

    if not moods:
        return {
            "total_entries": 0,
            "latest_mood": None,
            "most_common_mood": None,
            "average_wellness_score": 0,
            "wellness_level": "No Data",
            "mood_distribution": {}
        }

    mood_list = [mood.mood for mood in moods]

    counter = Counter(mood_list)
    scores = [
        MOOD_SCORES.get(mood.mood, 3)
        for mood in moods
    ]

    average_score = round(
        sum(scores) / len(scores),
        2
    )
    if average_score >= 4.5:
        wellness_level = "Excellent"
    elif average_score >= 3.5:
        wellness_level = "Good"
    elif average_score >= 2.5:
        wellness_level = "Moderate"
    elif average_score >= 1.5:
        wellness_level = "Needs Attention"
    else:
        wellness_level = "Critical"

    return {
        "total_entries": len(moods),

        "latest_mood": moods[0].mood,

        "most_common_mood": counter.most_common(1)[0][0],

        "average_wellness_score": average_score,

        "wellness_level": wellness_level,
        
        "mood_distribution": dict(counter)
    }