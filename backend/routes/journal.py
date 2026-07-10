from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.ai_service import analyze_journal
from services.journal_service import (
    save_journal,
    get_journal_history,
    get_journal_by_id,
    get_journal_statistics
)

journal_bp = Blueprint(
    "journal",
    __name__,
    url_prefix="/api/journal"
)


@journal_bp.route("", methods=["POST"])
@jwt_required()
def create_journal():

    user_id = int(get_jwt_identity())

    data = request.get_json() or {}

    title = data.get("title", "").strip()
    content = data.get("content", "").strip()

    if not title:
        return jsonify({"error": "Title is required"}), 400

    if not content:
        return jsonify({"error": "Content is required"}), 400

    ai = analyze_journal(content)

    journal = save_journal(
        user_id=user_id,
        title=title,
        content=content,
        ai_summary=ai["summary"],
        detected_emotion=ai["emotion"],
        ai_suggestion=ai["suggestion"]
    )

    return jsonify({
        "message": "Journal saved successfully.",
        "journal": journal.to_dict()
    }), 201

@journal_bp.route("/history", methods=["GET"])
@jwt_required()
def journal_history():

    user_id = int(get_jwt_identity())

    journals = get_journal_history(user_id)

    return jsonify(
        {
            "count": len(journals),
            "history": [
                journal.to_dict()
                for journal in journals
            ]
        }
    )

@journal_bp.route("/<int:journal_id>", methods=["GET"])
@jwt_required()
def journal_details(journal_id):

    user_id = int(get_jwt_identity())

    journal = get_journal_by_id(
        user_id,
        journal_id
    )

    if not journal:
        return jsonify(
            {
                "error": "Journal not found."
            }
        ), 404

    return jsonify(
        journal.to_dict()
    )

@journal_bp.route("/stats", methods=["GET"])
@jwt_required()
def journal_statistics():

    user_id = int(get_jwt_identity())

    stats = get_journal_statistics(user_id)

    return jsonify(stats)