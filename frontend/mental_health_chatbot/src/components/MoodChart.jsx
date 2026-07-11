import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

const COLORS = [
    "#4CAF50",
    "#2196F3",
    "#FFC107",
    "#FF5722",
    "#9C27B0",
    "#F44336"
];

export default function MoodChart({ data }) {

    const chartData = Object.entries(data || {}).map(
        ([name, value]) => ({
            name,
            value
        })
    );

    if (chartData.length === 0) {

        return (

            <div
                style={{
                    background: "white",
                    padding: 20,
                    borderRadius: 15,
                    width: "100%"
                }}
            >

                <h2>Mood Distribution</h2>

                <p>No mood data available.</p>

            </div>

        );

    }

    return (

        <div
            style={{
                background: "white",
                borderRadius: 15,
                padding: 25,
                width: "100%",
                maxWidth: "700px",
                boxShadow: "0 8px 20px rgba(0,0,0,.08)"
            }}
        >

            <h2>Mood Distribution</h2>

            <PieChart
                width={600}
                height={350}
            >

                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx={300}
                    cy={170}
                    outerRadius={110}
                    label
                >

                    {

                        chartData.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))

                    }

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </div>

    );

}