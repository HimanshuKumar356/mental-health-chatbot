import {

    PieChart,

    Pie,

    Cell,

    Tooltip,

    Legend,

    ResponsiveContainer

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

export default function EmotionChart({

    data

}){

    const chartData = Object.entries(data).map(

        ([name,value])=>({

            name,

            value

        })

    );

    return(

        <div className="chart-card">

            <h2>

                📈 Emotion Distribution

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

                                (_,index)=>(

                                    <Cell

                                        key={index}

                                        fill={
                                            COLORS[
                                                index%
                                                COLORS.length
                                            ]
                                        }

                                    />

                                )

                            )

                        }

                    </Pie>

                    <Tooltip/>

                    <Legend/>

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}