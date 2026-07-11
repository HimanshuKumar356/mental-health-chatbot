import "./../styles/dashboard.css";


import MoodChart from "../components/MoodChart";
import DashboardCard from "../components/DashboardCard";

import { useAuth } from "../context/AuthContext";

import { useEffect, useState } from "react";

import { getMoodStats } from "../api/mood";

import { getJournalStats } from "../api/journal";

export default function Dashboard(){

    const { user } = useAuth();
    const [moodStats, setMoodStats] = useState(null);

    const [journalStats, setJournalStats] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDashboard = async () => {
    
            try {
    
                const [mood, journal] = await Promise.all([
                    getMoodStats(),
                    getJournalStats()
                ]);
                
                console.log("Mood Stats:", mood);
                console.log("Journal Stats:", journal);

                setMoodStats(mood);
    
                setJournalStats(journal);
    
            }
    
            catch (err) {
    
                
                console.error("Dashboard API Error:", err);

                if (err.response) {
                    console.log("Status:", err.response.status);
                    console.log("Data:", err.response.data);
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
    
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                    fontSize: "24px",
                    fontWeight: "bold"
                }}
            >
                Loading Dashboard...
            </div>
    
        );
    
    }

    return(

        <div className="dashboard">

            <h1>

                Welcome,

                {" "}

                {user?.name}

                👋

            </h1>
            <p>

                {new Date().toLocaleDateString()}

            </p>
            <p>

                Here's an overview of your mental wellness today.

            </p>

            <br/>

            <div

                style={{

                    display:"grid",

                    gridTemplateColumns:"repeat(2,1fr)",

                    gap:"20px"

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

                    value={journalStats?.total_entries || 0}

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
            <MoodChart
                data={moodStats?.mood_distribution || {}}
            />

        </div>

    );

}