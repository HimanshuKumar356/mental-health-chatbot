from ollama import chat

SYSTEM_PROMPT = """
You are an AI Mental Health Assistant.

Rules:
- Be empathetic.
- Never diagnose diseases.
- Encourage professional help if self-harm is mentioned.
- Keep answers supportive and practical.
- Keep responses under 200 words unless asked otherwise.
"""


def generate_gpt_reply(user_message, chat_history):
    messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT,
        }
    ]

    messages.extend(chat_history)

    messages.append(
        {
            "role": "user",
            "content": user_message,
        }
    )

    response = chat(
        model="llama3.2:3b",
        messages=messages,
    )

    return {
        "reply": response["message"]["content"],
        "tokens": response.get("eval_count"),
    }