export default function DashboardCard({

    title,

    value,

    color,

    icon

}){

    return(

        <div

            style={{

                background:"white",

                padding:"25px",

                borderRadius:"12px",

                boxShadow:"0 5px 15px rgba(0,0,0,.08)",

                borderLeft:`5px solid ${color}`

            }}

        >

        <div
            style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"
            }}
        >

            <h3>

                {title}

            </h3>

            <span
                style={{
                    fontSize:"28px"
                }}
            >

                 {icon}

            </span>

        </div>

            <h2>

                {value}

            </h2>

        </div>

    );

}
