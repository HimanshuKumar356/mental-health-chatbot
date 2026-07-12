import { useEffect, useRef, useState } from "react";

import "../styles/chat.css";

import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import TypingIndicator from "../components/TypingIndicator";

import { sendMessage } from "../api/chat";

import { useNotification } from "../context/NotificationContext";

export default function Chat() {

    const { showNotification } = useNotification();

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            message:
                "Hello! 👋 I'm your AI Mental Wellness Assistant. I'm here to listen and support you. How are you feeling today?",
            time: new Date().toLocaleTimeString(),
            risk: "low"
        }
    ]);

    const [loading, setLoading] = useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {

        chatEndRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages, loading]);

    const handleSend = async (text) => {

        const userMessage = {

            sender: "user",

            message: text,

            time: new Date().toLocaleTimeString()

        };

        setMessages((prev) => [

            ...prev,

            userMessage

        ]);

        setLoading(true);

        try {

            const response = await sendMessage(text);

            const botMessage = {

                sender: "bot",

                message:

                    response.reply ||

                    "I'm sorry, I couldn't generate a response.",

                time: new Date().toLocaleTimeString(),

                risk:

                    response.analysis?.risk_level ||

                    "low"

            };

            setMessages((prev) => [

                ...prev,

                botMessage

            ]);

        }

        catch (err) {

            console.error("Chat Error:", err);

            showNotification(

                "Unable to contact the AI assistant.",

                "error"

            );

            setMessages((prev) => [

                ...prev,

                {

                    sender: "bot",

                    message:

                        "⚠️ Sorry, I'm unable to respond right now. Please try again in a moment.",

                    time: new Date().toLocaleTimeString(),

                    risk: "medium"

                }

            ]);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="chat-page">

            <div className="chat-header">

                <h2>

                    🤖 AI Mental Wellness Assistant

                </h2>

                <p>

                    A safe space to talk about your emotions.

                </p>

            </div>

            <div className="chat-body">

                {

                    messages.map((msg, index) => (

                        <ChatMessage

                            key={index}

                            sender={msg.sender}

                            message={msg.message}

                            time={msg.time}

                            risk={msg.risk}

                        />

                    ))

                }

                {

                    loading &&

                    <TypingIndicator />

                }

                <div ref={chatEndRef}></div>

            </div>

            <ChatInput

                onSend={handleSend}

                loading={loading}

            />

        </div>

    );

}