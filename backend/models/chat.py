from datetime import datetime
from extensions import db


class ChatHistory(db.Model):
    __tablename__ = "chat_history"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    user_message = db.Column(
        db.Text,
        nullable=False
    )

    bot_response = db.Column(
        db.Text,
        nullable=False
    )

    sentiment = db.Column(
        db.String(30),
        default="neutral"
    )

    emotion = db.Column(
        db.String(30),
        default="neutral"
    )

    risk_level = db.Column(
        db.String(20),
        default="low"
    )

    state = db.Column(
        db.String(30),
        default="neutral_or_mixed"
    )

    # Extra fields for analytics
    model_used = db.Column(
        db.String(50),
        default="gpt-3.5-turbo"
    )

    response_time_ms = db.Column(
        db.Integer,
        nullable=True
    )

    tokens_used = db.Column(
        db.Integer,
        nullable=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # Relationship
    user = db.relationship(
        "User",
        back_populates="chat_history"
    )