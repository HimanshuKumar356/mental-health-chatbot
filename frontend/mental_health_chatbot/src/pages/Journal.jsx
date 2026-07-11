import { useEffect, useState } from "react";

import "../styles/journal.css";

import {

    saveJournal,

    getJournalHistory

} from "../api/journal";

export default function Journal() {

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const [history, setHistory] = useState([]);

    const loadHistory = async () => {

        try {
    
            const data = await getJournalHistory();
    
            setHistory(data.history);
    
        }
    
        catch (err) {
    
            console.error(err);
    
        }
    
    };
    
    useEffect(() => {
    
        loadHistory();
    
    }, []);

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

            await loadHistory();

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

            <h2
                style={{
                    marginTop: "50px"
                }}
            >

                📚 Journal History

            </h2>

            <div className="journal-history">

                {

                    history.length === 0

                    ?

                    (

                        <p>

                            No journal entries yet.

                        </p>

                    )

                    :

                    history.map((journal) => (

                        <div

                            key={journal.id}

                            className="history-card"

                        >

                            <h3>

                                📖 {journal.title}

                            </h3>

                            <p>

                                {journal.content.length > 120

                                    ? journal.content.substring(0,120) + "..."

                                    : journal.content}

                            </p>

                            <small>

                                {

                                    new Date(

                                        journal.created_at

                                    ).toLocaleString()

                                }

                            </small>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}