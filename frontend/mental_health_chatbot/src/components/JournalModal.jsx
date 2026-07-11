import { useEffect } from "react";

import "../styles/journal.css";

export default function JournalModal({

    journal,

    onClose

}) {

    useEffect(() => {

        const handleEsc = (e) => {

            if (e.key === "Escape") {

                onClose();

            }

        };

        document.addEventListener("keydown", handleEsc);

        return () =>

            document.removeEventListener("keydown", handleEsc);

    }, [onClose]);

    if (!journal) return null;

    return (

        <div

            className="modal-overlay"

            onClick={onClose}

        >

            <div

                className="journal-modal"

                onClick={(e) => e.stopPropagation()}

            >

                <button

                    className="close-btn"

                    onClick={onClose}

                >

                    ✕

                </button>

                <h2>

                    📖 {journal.title}

                </h2>

                <p className="modal-date">

                    {new Date(journal.created_at).toLocaleString()}

                </p>

                <hr />

                <section>

                    <h3>

                        📝 Journal Entry

                    </h3>

                    <p>

                        {journal.content}

                    </p>

                </section>

                <section>

                    <h3>

                        🤖 AI Summary

                    </h3>

                    <p>

                        {journal.ai_summary || "No AI summary available."}

                    </p>

                </section>

                <section>

                    <h3>

                        😊 Detected Emotion

                    </h3>

                    <p>

                        {journal.detected_emotion || "Unknown"}

                    </p>

                </section>

                <section>

                    <h3>

                        💡 AI Suggestion

                    </h3>

                    <p>

                        {journal.ai_suggestion || "No suggestion available."}

                    </p>

                </section>

            </div>

        </div>

    );

}