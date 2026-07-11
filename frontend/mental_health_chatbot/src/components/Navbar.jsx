import { useAuth } from "../context/AuthContext";

import "../styles/navbar.css";

export default function Navbar() {

    const { user } = useAuth();

    return (

        <div className="navbar">

            <div>

                <h2>

                    Dashboard

                </h2>

                <p>

                    Welcome back,

                    {" "}

                    {user?.name}

                    👋

                </p>

            </div>

            <div className="profile">

                👤

                <span>

                    {user?.name}

                </span>

            </div>

        </div>

    );

}