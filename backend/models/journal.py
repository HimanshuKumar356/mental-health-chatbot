from datetime import datetime
from extensions import db


class JournalEntry(db.Model):
    __tablename__ = "journal_entries"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    title = db.Column(
        db.String(150),
        nullable=False
    )

    content = db.Column(
        db.Text,
        nullable=False
    )

    ai_summary = db.Column(
        db.Text,
        nullable=True
    )

    detected_emotion = db.Column(
        db.String(50),
        nullable=True
    )

    ai_suggestion = db.Column(
        db.Text,
        nullable=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "ai_summary": self.ai_summary,
            "detected_emotion": self.detected_emotion,
            "ai_suggestion": self.ai_suggestion,
            "created_at": self.created_at.isoformat()
        }