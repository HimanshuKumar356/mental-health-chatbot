




from flask import Flask
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from config import Config
from extensions import db, bcrypt, jwt, migrate
from routes.auth import auth_bp

#Important
from models.user import User

app = Flask(__name__)

app.config.from_object(Config)
import os

print("=" * 50)
print("Current Working Directory:", os.getcwd())
print("DATABASE_URL from os.getenv():", os.getenv("DATABASE_URL"))
print("DATABASE_URI from app.config:", app.config.get("SQLALCHEMY_DATABASE_URI"))
print("=" * 50)

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
migrate.init_app(app, db)

CORS(
    app,
    resources={
        r"/*": {
            "origins": Config.FRONTEND_ORIGINS
        }
    }
)

app.register_blueprint(auth_bp)

limiter = Limiter(
    key_func=get_remote_address,
    app=app,
    default_limits=[Config.RATE_LIMIT]
)


@app.route("/")
def home():
    return "Mental Health Chatbot Backend Running"


@app.route("/health")
def health():
    return {
        "status": "healthy"
    }


if __name__ == "__main__":
    app.run(debug=True)