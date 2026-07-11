import "../styles/mood.css";

export default function Mood() {

    const moods = [

        "😊 Happy",

        "😌 Calm",

        "😐 Neutral",

        "😢 Sad",

        "😰 Anxious",

        "😓 Stressed",

        "😡 Angry"

    ];

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

                            className="mood-card"

                        >

                            {mood}

                        </button>

                    ))

                }

            </div>

        </div>

    );

}