import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAX_MESSAGE_LENGTH = int(os.getenv("MAX_MESSAGE_LENGTH", 800))

    RATE_LIMIT = os.getenv("RATE_LIMIT", "30 per minute")

    FRONTEND_ORIGINS = os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:5173"
    ).split(",")

    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")