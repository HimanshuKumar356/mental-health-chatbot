import "./../styles/dashboard.css";

import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import DashboardCard from "../components/DashboardCard";
import MoodChart from "../components/MoodChart";

import { getMoodStats } from "../api/mood";
import { getJournalStats } from "../api/journal";

export default function Dashboard() {

    const { user } = useAuth();

    const [moodStats, setMoodStats] = useState(null);
    const [journalStats, setJournalStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "🌅 Good Morning"
            : hour < 18
            ? "☀️ Good Afternoon"
            : "🌙 Good Evening";

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const [mood, journal] = await Promise.all([
                    getMoodStats(),
                    getJournalStats()
                ]);

                setMoodStats(mood);
                setJournalStats(journal);

            }

            catch (err) {

                console.error("Dashboard API Error:", err);

                if (err.response) {
                    console.log(err.response.data);
                }

                setMoodStats({});
                setJournalStats({});

            }

            finally {

                setLoading(false);

            }

        };

        loadDashboard();

    }, []);

    if (loading) {

        return (

            <div className="loading-screen">

                <h2>Loading Dashboard...</h2>

            </div>

        );

    }

    return (

        <div className="dashboard">

            <h1>

                {greeting}, {user?.name} 👋

            </h1>

            <p className="dashboard-date">

                {new Date().toLocaleDateString()}

            </p>

            <p className="dashboard-subtitle">

                Track your mood, journal activity and overall wellness.

            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                    gap: "20px"
                }}
            >

                <DashboardCard
                    title="Current Mood"
                    value={moodStats?.latest_mood || "No Data"}
                    color="#4CAF50"
                    icon="😊"
                />

                <DashboardCard
                    title="Wellness"
                    value={moodStats?.wellness_level || "Unknown"}
                    color="#2196F3"
                    icon="⭐"
                />

                <DashboardCard
                    title="Journal Entries"
                    value={journalStats?.total_journals || 0}
                    color="#9C27B0"
                    icon="📖"
                />

                <DashboardCard
                    title="AI Chats"
                    value="Coming Soon"
                    color="#FF9800"
                    icon="💬"
                />

            </div>

            <div className="analytics-header">

                <h2>

                    📊 Mood Analytics

                </h2>

                <p>

                    Visual overview of your emotional wellness.

                </p>

            </div>

            <div className="chart-container">

                <MoodChart
                    data={moodStats?.mood_distribution || {}}
                />

            </div>

        </div>

    );

}