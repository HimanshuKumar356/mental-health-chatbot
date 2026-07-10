from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.mood_service import (
    save_mood,
    get_mood_history,
    get_mood_statistics
)

mood_bp = Blueprint(
    "mood",
    __name__,
    url_prefix="/api/mood"
)

VALID_MOODS = [
    "Happy",
    "Calm",
    "Neutral",
    "Sad",
    "Stressed",
    "Anxious",
    "Angry"
]


@mood_bp.route("", methods=["POST"])
@jwt_required()
def create_mood():

    user_id = int(get_jwt_identity())

    data = request.get_json() or {}

    mood = data.get("mood")

    note = data.get("note", "")

    if not mood:
        return jsonify({
            "error": "Mood is required."
        }), 400

    if mood not in VALID_MOODS:
        return jsonify({
            "error": "Invalid mood.",
            "valid_moods": VALID_MOODS
        }), 400

    mood_entry = save_mood(
        user_id=user_id,
        mood=mood,
        note=note
    )

    return jsonify({
        "message": "Mood saved successfully.",
        "data": mood_entry.to_dict()
    }), 201

@mood_bp.route("/history", methods=["GET"])
@jwt_required()
def mood_history():

    user_id = int(get_jwt_identity())

    moods = get_mood_history(user_id)

    return jsonify(
        {
            "count": len(moods),
            "history": [
                mood.to_dict()
                for mood in moods
            ]
        }
    )

@mood_bp.route("/stats", methods=["GET"])
@jwt_required()
def mood_statistics():

    user_id = int(get_jwt_identity())
    
    stats = get_mood_statistics(user_id)

    return jsonify(stats)
       