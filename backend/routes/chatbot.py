import time

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from extensions import db
from models.chat import ChatHistory
from services.ai_service import generate_ai_reply
from services.risk_service import detect_risk, classify_state
from services.memory_service import load_chat_memory
from services.chat_service import save_chat

chatbot_bp = Blueprint(
    "chatbot",
    __name__,
    url_prefix="/api/chat"
)


#add /analyse
@chatbot_bp.route("/analyze", methods=["POST"])
@jwt_required()
def analyze():

    start_time = time.time()

    user_id = int(get_jwt_identity())

    data = request.get_json() or {}

    user_message = data.get("message", "")

    chat_history = load_chat_memory(user_id)

    if not user_message.strip():
        return jsonify(
            {
                "error": "Message is required."
            }
        ), 400

    sentiment = "neutral"

    emotion = "neutral"

    risk_level = detect_risk(
        user_message,
        sentiment,
        emotion
    )

    state = classify_state(
        user_message,
        emotion
    )

    ai = generate_ai_reply(
        user_message,
        chat_history
    )

    reply = ai["reply"]

    tokens = ai["tokens"]

    elapsed = int(
        (time.time() - start_time) * 1000
    )

    try:
        ai = generate_ai_reply(
        user_message,
        chat_history
        )

        reply = ai["reply"]
        tokens = ai["tokens"]

    except Exception as e:
        return jsonify(
        {
            "error": "Unable to generate AI response.",
            "details": str(e)
        }
    ), 500

    
#save chat
    save_chat(
    user_id=user_id,
    user_message=user_message,
    bot_response=reply,
    sentiment=sentiment,
    emotion=emotion,
    risk_level=risk_level,
    state=state,
    response_time_ms=elapsed,
    tokens_used=tokens,
    model_used="llama3.2:3b"
    )


# return response
    return jsonify(
        {
            "reply": reply,

            "analysis": {

                "sentiment": sentiment,

                "emotion": emotion,

                "risk_level": risk_level,

                "state": state

            }

        }
    )