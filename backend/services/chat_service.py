# services/chat_service.py

from extensions import db
from models.chat import ChatHistory


def save_chat(
    user_id,
    user_message,
    bot_response,
    sentiment,
    emotion,
    risk_level,
    state,
    response_time_ms,
    tokens_used,
    model_used="llama3.2:3b"
):
    """
    Save a conversation to the database.
    """

    chat = ChatHistory(
        user_id=user_id,
        user_message=user_message,
        bot_response=bot_response,
        sentiment=sentiment,
        emotion=emotion,
        risk_level=risk_level,
        state=state,
        model_used=model_used,
        response_time_ms=response_time_ms,
        tokens_used=tokens_used
    )

    db.session.add(chat)
    db.session.commit()

    return chat