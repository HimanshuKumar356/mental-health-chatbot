import time

from ollama import chat

SYSTEM_PROMPT = """
You are a compassionate mental health assistant.

Rules:
- Be empathetic.
- Never diagnose diseases.
- Give short, natural responses.
- Avoid repeating yourself.
- Encourage professional help if the user expresses self-harm.
"""


def generate_ai_reply(user_message, chat_history):

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

    start = time.time()

    response = chat(

        model="llama3.2:3b",

        messages=messages

    )

    print(

        f"Ollama response time: {time.time()-start:.2f} sec"

    )

    return {

        "reply": response["message"]["content"],

        "tokens": None

    }


def analyze_journal(content):

    prompt = f"""
You are an AI mental wellness assistant.

Analyze this journal entry.

Journal:
{content}

Return ONLY in this format:

Summary:
<short summary>

Emotion:
<one word>

Suggestion:
<2-3 sentence wellness suggestion>
"""

    start = time.time()

    response = chat(

        model="llama3.2:3b",

        messages=[

            {

                "role": "user",

                "content": prompt

            }

        ]

    )

    print(

        f"Journal AI time: {time.time()-start:.2f} sec"

    )

    text = response["message"]["content"]

    summary = ""

    emotion = ""

    suggestion = ""

    for line in text.splitlines():

        if line.startswith("Summary:"):

            summary = line.replace("Summary:", "").strip()

        elif line.startswith("Emotion:"):

            emotion = line.replace("Emotion:", "").strip()

        elif line.startswith("Suggestion:"):

            suggestion = line.replace("Suggestion:", "").strip()

    return {

        "summary": summary,

        "emotion": emotion,

        "suggestion": suggestion

    }