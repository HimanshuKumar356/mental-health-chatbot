import { useState } from "react";

import "../styles/mood.css";

import { saveMood } from "../api/mood";

export default function Mood() {

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

    const [message, setMessage] = useState("");

    const handleSave = async () => {

        if (!selectedMood) {

            alert("Please select a mood.");

            return;

        }

        try {

            setLoading(true);

            await saveMood(selectedMood, note);

            setMessage("✅ Mood saved successfully!");

            setSelectedMood("");

            setNote("");

        }

        catch (err) {

            console.error(err);

            setMessage("❌ Failed to save mood.");

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

            {

                message &&

                <p className="save-message">

                    {message}

                </p>

            }

        </div>

    );

}