import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login", { replace: true });

    };

    return (

        <div style={{ padding: "40px" }}>

            <h1>

                Welcome, {user?.name} 👋

            </h1>

            <p>

                {user?.email}

            </p>

            <br />

            <button onClick={handleLogout}>

                Logout

            </button>

        </div>

    );

}