import "../styles/chat.css";

export default function TypingIndicator() {

    return (

        <div className="chat-message bot-message">

            {/* AI Avatar */}

            <div className="avatar">

                🤖

            </div>

            <div className="message-content">

                <div className="message-header">

                    AI Assistant

                </div>

                <div className="message-bubble">

                    <div className="typing-dots">

                        <span></span>

                        <span></span>

                        <span></span>

                    </div>

                </div>

            </div>

        </div>

    );

}