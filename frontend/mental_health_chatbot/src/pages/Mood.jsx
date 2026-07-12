import { useEffect, useState } from "react";

import MoodChart from "../components/MoodChart";

import "../styles/mood.css";

import { useNotification } from "../context/NotificationContext";

import {
    saveMood,
    getMoodHistory,
    getMoodStats
} from "../api/mood";

export default function Mood() {

    const { showNotification } = useNotification();

    const moods = [

        "Happy",

        "Calm",

        "Neutral",

        "Sad",

        "Stressed",

        "Anxious",

        "Angry"

    ];

    const moodEmoji = {

        Happy: "😊",

        Calm: "😌",

        Neutral: "😐",

        Sad: "😢",

        Stressed: "😓",

        Anxious: "😰",

        Angry: "😡"

    };

    const [selectedMood, setSelectedMood] = useState("");

    const [note, setNote] = useState("");

    const [loading, setLoading] = useState(false);

    const [history, setHistory] = useState([]);

    const [stats, setStats] = useState(null);

    useEffect(() => {

        loadHistory();

        loadStats();

    }, []);

    const loadHistory = async () => {

        try {

            const data = await getMoodHistory();

            setHistory(data.history);

        }

        catch (err) {

            console.error(err);

            showNotification(

                "Unable to load mood history.",

                "error"

            );

        }

    };

    const loadStats = async () => {

        try {

            const data = await getMoodStats();

            setStats(data);

        }

        catch (err) {

            console.error(err);

            showNotification(

                "Unable to load mood statistics.",

                "error"

            );

        }

    };

    const handleSave = async () => {

        if (!selectedMood) {

            showNotification(

                "Please select a mood.",

                "error"

            );

            return;

        }

        try {

            setLoading(true);

            await saveMood(

                selectedMood,

                note

            );

            await Promise.all([

                loadHistory(),

                loadStats()

            ]);

            showNotification(

                "Mood saved successfully!",

                "success"

            );

            setSelectedMood("");

            setNote("");

        }

        catch (err) {

            console.error(err);

            showNotification(

                "Failed to save mood.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="mood-page">

            <h1>

                😊 Mood Tracker

            </h1>

            <p>

                How are you feeling today?

            </p>

            <div className="mood-grid">

                {

                    moods.map((mood) => (

                        <button

                            key={mood}

                            className={`mood-card ${

                                selectedMood === mood

                                    ? "selected"

                                    : ""

                            }`}

                            onClick={() =>

                                setSelectedMood(mood)

                            }

                        >

                            <div style={{ fontSize: "32px" }}>

                                {moodEmoji[mood]}

                            </div>

                            <div>

                                {mood}

                            </div>

                        </button>

                    ))

                }

            </div>

            <textarea

                className="mood-note"

                placeholder="Write a note (optional)..."

                value={note}

                onChange={(e) =>

                    setNote(e.target.value)

                }

            />

            <button

                className="save-mood-btn"

                onClick={handleSave}

                disabled={loading}

            >

                {

                    loading

                        ? "Saving..."

                        : "Save Mood"

                }

            </button>

            <h2
                style={{
                    marginTop: "50px"
                }}
            >

                📊 Mood Statistics

            </h2>

            <div className="stats-grid">

                <div className="stat-card">

                    <h3>

                        Total Entries

                    </h3>

                    <p>

                        {stats?.total_entries || 0}

                    </p>

                </div>

                <div className="stat-card">

                    <h3>

                        Latest Mood

                    </h3>

                    <p>

                        {moodEmoji[stats?.latest_mood]}

                        {" "}

                        {stats?.latest_mood || "N/A"}

                    </p>

                </div>

                <div className="stat-card">

                    <h3>

                        Most Common

                    </h3>

                    <p>

                        {moodEmoji[stats?.most_common_mood]}

                        {" "}

                        {stats?.most_common_mood || "N/A"}

                    </p>

                </div>

                <div className="stat-card">

                    <h3>

                        Wellness

                    </h3>

                    <p

                        style={{

                            color:

                                stats?.wellness_level === "Excellent"

                                    ? "#4CAF50"

                                    : stats?.wellness_level === "Good"

                                    ? "#2196F3"

                                    : stats?.wellness_level === "Average"

                                    ? "#FFC107"

                                    : "#F44336"

                        }}

                    >

                        {stats?.wellness_level || "Unknown"}

                    </p>

                </div>

                <div className="stat-card">

                    <h3>

                        Average Score

                    </h3>

                    <p>

                        ⭐ {stats?.average_wellness_score ?? 0}

                    </p>

                </div>

            </div>

            <MoodChart

                data={stats?.mood_distribution || {}}

            />

            <h2
                style={{
                    marginTop: "50px"
                }}
            >

                📅 Recent Mood History

            </h2>

            <div className="history-list">

                {

                    history.length === 0

                        ?

                        (

                            <p>

                                No mood history yet.

                            </p>

                        )

                        :

                        history.map((item) => (

                            <div

                                key={item.id}

                                className="history-card"

                            >

                                <h3>

                                    {moodEmoji[item.mood]} {item.mood}

                                </h3>

                                <p>

                                    {item.note || "No note added."}

                                </p>

                                <small>

                                    {

                                        new Date(

                                            item.created_at

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