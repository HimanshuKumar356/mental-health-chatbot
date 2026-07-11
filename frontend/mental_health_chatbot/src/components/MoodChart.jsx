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

    "#9C27B0",

    "#F44336",

    "#00BCD4"

];

export default function MoodChart({

    data

}) {

    const chartData = Object.entries(data).map(

        ([name, value]) => ({

            name,

            value

        })

    );

    if (chartData.length === 0) {

        return (

            <div
                className="chart-card"
            >

                <h2>

                    📈 Mood Distribution

                </h2>

                <p>

                    No mood data available yet.

                </p>

            </div>

        );

    }

    return (

        <div
            className="chart-card"
        >

            <h2>

                📈 Mood Distribution

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie

                        data={chartData}

                        dataKey="value"

                        nameKey="name"

                        outerRadius={120}

                        label

                    >

                        {

                            chartData.map(

                                (_, index) => (

                                    <Cell

                                        key={index}

                                        fill={
                                            COLORS[
                                                index %
                                                COLORS.length
                                            ]
                                        }

                                    />

                                )

                            )

                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}