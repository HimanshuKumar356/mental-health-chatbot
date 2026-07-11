import { useState } from "react";

import "../styles/journal.css";

import { saveJournal } from "../api/journal";

export default function Journal() {

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const handleSave = async () => {

        if (!title.trim() || !content.trim()) {

            alert("Please enter both title and journal content.");

            return;

        }

        try {

            setLoading(true);

            const data = await saveJournal(

                title,

                content

            );

            setResult(data.journal);

            setTitle("");

            setContent("");

        }

        catch (err) {

            console.error(err);

            alert("Failed to save journal.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="journal-page">

            <h1>

                📖 AI Journal

            </h1>

            <p>

                Reflect on your day and let AI summarize your thoughts.

            </p>

            <input

                className="journal-title"

                placeholder="Journal Title"

                value={title}

                onChange={(e) =>

                    setTitle(e.target.value)

                }

            />

            <textarea

                className="journal-content"

                placeholder="Write about your day..."

                value={content}

                onChange={(e) =>

                    setContent(e.target.value)

                }

            />

            <button

                className="journal-btn"

                onClick={handleSave}

                disabled={loading}

            >

                {

                    loading

                        ? "Saving..."

                        : "Save Journal"

                }

            </button>

            {

                result &&

                <div className="journal-result">

                    <h2>

                        🤖 AI Analysis

                    </h2>

                    <div className="analysis-card">

                        <h3>

                            📝 Summary

                        </h3>

                        <p>

                            {result.ai_summary}

                        </p>

                    </div>

                    <div className="analysis-card">

                        <h3>

                            😊 Emotion

                        </h3>

                        <p>

                            {result.detected_emotion}

                        </p>

                    </div>

                    <div className="analysis-card">

                        <h3>

                            💡 Suggestion

                        </h3>

                        <p>

                            {result.ai_suggestion}

                        </p>

                    </div>

                </div>

            }

        </div>

    );

}