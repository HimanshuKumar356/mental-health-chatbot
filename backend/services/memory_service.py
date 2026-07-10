from models.chat import ChatHistory


def load_chat_memory(user_id, limit=5):
    """
    Load previous conversations for the given user
    and convert them into Ollama/OpenAI format.
    """

    previous_chats = (
        ChatHistory.query
        .filter_by(user_id=user_id)
        .order_by(ChatHistory.id.desc())
        .limit(limit)
        .all()
    )

    history = []

    for chat in reversed(previous_chats):

        history.append(
            {
                "role": "user",
                "content": chat.user_message
            }
        )

        history.append(
            {
                "role": "assistant",
                "content": chat.bot_response
            }
        )

    return history
