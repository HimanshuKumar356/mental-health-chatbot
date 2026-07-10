# services/memory_service.py

from models.chat import ChatHistory


def load_chat_memory(user_id, limit=5):
    """
    Load previous chat history for the user and convert it
    into the format expected by the AI model.
    """

    previous_chats = (
        ChatHistory.query
        .filter_by(user_id=user_id)
        .order_by(ChatHistory.id.desc())
        .limit(limit)
        .all()
    )

    chat_history = []

    # Oldest first
    for chat in reversed(previous_chats):

        chat_history.append(
            {
                "role": "user",
                "content": chat.user_message
            }
        )

        chat_history.append(
            {
                "role": "assistant",
                "content": chat.bot_response
            }
        )

    return chat_history