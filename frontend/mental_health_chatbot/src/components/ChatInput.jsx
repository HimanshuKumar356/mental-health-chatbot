import { useState } from "react";

export default function ChatInput({

    onSend,

    loading

}) {

    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!message.trim() || loading) return;

        onSend(message.trim());

        setMessage("");

    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            handleSubmit(e);

        }

    };

    return (

        <form

            className="chat-footer"

            onSubmit={handleSubmit}

        >

            <textarea

                rows={2}

                placeholder="Type how you're feeling..."

                value={message}

                onChange={(e) =>

                    setMessage(e.target.value)

                }

                onKeyDown={handleKeyDown}

                disabled={loading}

            />

            <button

                type="submit"

                disabled={loading || !message.trim()}

            >

                {

                    loading

                        ? "Thinking..."

                        : "Send"

                }

            </button>

        </form>

    );

}