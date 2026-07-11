import "../styles/chat.css";

import { useAuth } from "../context/AuthContext";

export default function ChatMessage({

    sender,

    message,

    time,

    risk = "low"

}) {

    const { user } = useAuth();

    const initials =
        user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase() || "U";

    const copyMessage = async () => {

        try {

            await navigator.clipboard.writeText(message);

            alert("Message copied!");

        }

        catch (err) {

            console.error(err);

        }

    };

    return (

        <div
            className={`chat-message ${
                sender === "user"
                    ? "user-message"
                    : "bot-message"
            }`}
        >

            {/* Avatar */}

            <div className="avatar">

                {

                    sender === "user"

                        ? initials

                        : "🤖"

                }

            </div>

            {/* Content */}

            <div className="message-content">

                {/* Sender */}

                <div className="message-header">

                    {

                        sender === "user"

                            ? user?.name || "You"

                            : "AI Assistant"

                    }

                </div>

                {/* Bubble */}

                <div
                    className={`message-bubble ${
                        risk === "high"
                            ? "high-risk"
                            : risk === "medium"
                            ? "medium-risk"
                            : "low-risk"
                    }`}
                >

                    {message}

                </div>

                {/* Footer */}

                <div className="message-footer">

                    <span className="message-time">

                        {time}

                    </span>

                    {

                        sender === "bot" && (

                            <>

                                <button
                                    className="copy-btn"
                                    onClick={copyMessage}
                                >

                                    📋 Copy

                                </button>

                                <div className="feedback-buttons">

                                    <button
                                        title="Helpful"
                                    >

                                        👍

                                    </button>

                                    <button
                                        title="Not Helpful"
                                    >

                                        👎

                                    </button>

                                </div>

                            </>

                        )

                    }

                </div>

            </div>

        </div>

    );

}