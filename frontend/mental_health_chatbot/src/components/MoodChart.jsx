import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = [
    "#4CAF50",
    "#2196F3",
    "#FFC107",
    "#FF5722",
    "#9C27B0"
];

export default function MoodChart({ data }) {

    const chartData = Object.entries(data || {}).map(
        ([name, value]) => ({
            name,
            value
        })
    );

    console.log(chartData);

    if (chartData.length === 0) {

        return <p>No mood data available.</p>;

    }

    return (

        <div
            style={{
                background: "white",
                padding: 20,
                borderRadius: 12,
                marginTop: 30,
                height: 350
            }}
        >

            <h2>Mood Distribution</h2>

            <ResponsiveContainer width="100%" height={280}>

                <PieChart>

                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
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

            </ResponsiveContainer>

        </div>

    );

}