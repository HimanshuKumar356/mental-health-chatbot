from extensions import db
from models.journal import JournalEntry
from collections import Counter


def save_journal(
    user_id,
    title,
    content,
    ai_summary,
    detected_emotion,
    ai_suggestion
):

    journal = JournalEntry(
        user_id=user_id,
        title=title,
        content=content,
        ai_summary=ai_summary,
        detected_emotion=detected_emotion,
        ai_suggestion=ai_suggestion
    )

    db.session.add(journal)
    db.session.commit()

    return journal

def get_journal_history(user_id):
    """
    Returns all journal entries of a user.
    Latest entries appear first.
    """

    journals = (
        JournalEntry.query
        .filter_by(user_id=user_id)
        .order_by(JournalEntry.created_at.desc())
        .all()
    )

    return journals

def get_journal_by_id(user_id, journal_id):

    journal = (
        JournalEntry.query
        .filter_by(
            id=journal_id,
            user_id=user_id
        )
        .first()
    )

    return journal

def get_journal_statistics(user_id):
    """
    Generate statistics for the user's journals.
    """

    journals = (
        JournalEntry.query
        .filter_by(user_id=user_id)
        .order_by(JournalEntry.created_at.desc())
        .all()
    )

    if not journals:
        return {
            "total_journals": 0,
            "latest_emotion": None,
            "most_common_emotion": None,
            "emotion_distribution": {}
        }

    emotions = [
        journal.detected_emotion
        for journal in journals
        if journal.detected_emotion
    ]

    counter = Counter(emotions)

    return {
        "total_journals": len(journals),
        "latest_emotion": journals[0].detected_emotion,
        "most_common_emotion": counter.most_common(1)[0][0] if emotions else None,
        "emotion_distribution": dict(counter)
    }