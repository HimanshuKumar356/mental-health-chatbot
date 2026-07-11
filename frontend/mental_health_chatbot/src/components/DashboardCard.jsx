export default function DashboardCard({

    title,

    value,

    color,

    icon

}) {

    return (

        <div
            className="dashboard-card"
            style={{
                borderLeft: `5px solid ${color}`
            }}
        >

            <div className="card-header">

                <h3>

                    {title}

                </h3>

                <span className="card-icon">

                    {icon}

                </span>

            </div>

            <h2 className="card-value">

                {value}

            </h2>

        </div>

    );

}