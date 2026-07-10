from ollama import chat

SYSTEM_PROMPT = """
You are a compassionate mental health assistant.

Rules:
- Be empathetic.
- Never diagnose diseases.
- Encourage professional help if the user expresses self-harm.
"""


def generate_gpt_reply(user_message, chat_history):
    messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        }
    ]

    messages.extend(chat_history)

    messages.append(
        {
            "role": "user",
            "content": user_message
        }
    )

    response = chat(
        model="llama3.2:3b",
        messages=messages
    )

    return {
        "reply": response["message"]["content"],
        "tokens": None
    }