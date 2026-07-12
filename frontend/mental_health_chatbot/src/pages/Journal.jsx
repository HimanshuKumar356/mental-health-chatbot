import { useEffect, useState } from "react";

import "../styles/journal.css";

import {

    saveJournal,

    getJournalHistory,

    getJournalDetails,

    getJournalStats

} from "../api/journal";

import JournalModal from "../components/JournalModal";
import EmotionChart from "../components/EmotionChart";

import { useNotification } from "../context/NotificationContext";

export default function Journal() {

    const { showNotification } = useNotification();

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const [history, setHistory] = useState([]);

    const [selectedJournal, setSelectedJournal] = useState(null);

    const [stats, setStats] = useState(null);

    useEffect(() => {

        loadHistory();

        loadStats();

    }, []);

    const loadStats = async () => {

        try {

            const data = await getJournalStats();

            setStats(data);

        }

        catch (err) {

            console.error(err);

            showNotification(

                "Unable to load journal statistics.",

                "error"

            );

        }

    };

    const loadHistory = async () => {

        try {

            const data = await getJournalHistory();

            setHistory(data.history || data);

        }

        catch (err) {

            console.error("History Error:", err);

            showNotification(

                "Unable to load journal history.",

                "error"

            );

        }

    };

    const openJournal = async (id) => {

        try {

            const data = await getJournalDetails(id);

            setSelectedJournal(data.journal || data);

        }

        catch (err) {

            console.error("Details Error:", err);

            showNotification(

                "Unable to load journal details.",

                "error"

            );

        }

    };

    const handleSave = async () => {

        if (!title.trim() || !content.trim()) {

            showNotification(

                "Please enter both title and journal content.",

                "error"

            );

            return;

        }

        try {

            setLoading(true);

            const data = await saveJournal(

                title,

                content

            );

            setResult(data.journal || data);

            await Promise.all([

                loadHistory(),

                loadStats()

            ]);

            showNotification(

                "Journal saved successfully!",

                "success"

            );

            setTitle("");

            setContent("");

        }

        catch (err) {

            console.error(err);

            showNotification(

                "Failed to save journal.",

                "error"

            );

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

                result && (

                    <div className="journal-result">

                        <h2>

                            🤖 AI Analysis

                        </h2>

                        <div className="analysis-card">

                            <h3>

                                📝 Summary

                            </h3>

                            <p>

                                {result.ai_summary || "No summary available."}

                            </p>

                        </div>

                        <div className="analysis-card">

                            <h3>

                                😊 Emotion

                            </h3>

                            <p>

                                {result.detected_emotion || "Unknown"}

                            </p>

                        </div>

                        <div className="analysis-card">

                            <h3>

                                💡 Suggestion

                            </h3>

                            <p>

                                {result.ai_suggestion || "No suggestion available."}

                            </p>

                        </div>

                    </div>

                )

            }

            <h2
                style={{
                    marginTop: "50px"
                }}
            >

                📊 Journal Analytics

            </h2>

            <div className="stats-grid">

                <div className="stat-card">

                    <h3>

                        Total Journals

                    </h3>

                    <p>

                        {stats?.total_journals || 0}

                    </p>

                </div>

                <div className="stat-card">

                    <h3>

                        Latest Emotion

                    </h3>

                    <p>

                        😊 {stats?.latest_emotion || "N/A"}

                    </p>

                </div>

                <div className="stat-card">

                    <h3>

                        Most Common Emotion

                    </h3>

                    <p>

                        😊 {stats?.most_common_emotion || "N/A"}

                    </p>

                </div>

            </div>

            <EmotionChart

                data={stats?.emotion_distribution || {}}

            />

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

                                onClick={() =>

                                    openJournal(journal.id)

                                }

                                style={{

                                    cursor: "pointer"

                                }}

                            >

                                <h3>

                                    📖 {journal.title}

                                </h3>

                                <p>

                                    {

                                        journal.content?.length > 120

                                            ?

                                            journal.content.substring(0, 120) + "..."

                                            :

                                            journal.content

                                    }

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

            <JournalModal

                journal={selectedJournal}

                onClose={() =>

                    setSelectedJournal(null)

                }

            />

        </div>

    );

}