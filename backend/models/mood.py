from datetime import datetime
from extensions import db


class MoodEntry(db.Model):
    __tablename__ = "mood_entries"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    mood = db.Column(
        db.String(30),
        nullable=False
    )

    note = db.Column(
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
            "user_id": self.user_id,
            "mood": self.mood,
            "note": self.note,
            "created_at": self.created_at.isoformat()
        }