import time

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from extensions import db
from models.chat import ChatHistory
from services.ai_service import generate_gpt_reply
from services.risk_service import detect_risk, classify_state

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

    #chat_history = data.get("chat_history", [])
    previous_chats = (
    ChatHistory.query
    .filter_by(user_id=user_id)
    .order_by(ChatHistory.id.desc())
    .limit(5)
    .all()
    )

    chat_history = []

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

    ai = generate_gpt_reply(
        user_message,
        chat_history
    )

    reply = ai["reply"]

    tokens = ai["tokens"]

    elapsed = int(
        (time.time() - start_time) * 1000
    )


#save chat
    chat = ChatHistory(

        user_id=user_id,

        user_message=user_message,

        bot_response=reply,

        sentiment=sentiment,

        emotion=emotion,

        risk_level=risk_level,

        state=state,

        model_used="gpt-3.5-turbo",

        response_time_ms=elapsed,

        tokens_used=tokens

    )

    db.session.add(chat)

    db.session.commit()


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