from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from extensions import db, bcrypt
from models.user import User

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


# -----------------------------
# Register
# -----------------------------
@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    existing = User.query.filter_by(email=email).first()

    if existing:
        return jsonify({"error": "Email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    user = User(
        name=name,
        email=email,
        password=hashed_password
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Registration successful"
    }), 201


# -----------------------------
# Login
# -----------------------------
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({

        "token": access_token,

        "user": {

            "id": user.id,

            "name": user.name,

            "email": user.email

        }

    })


# -----------------------------
# Profile
# -----------------------------
@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    return jsonify(user.to_dict())