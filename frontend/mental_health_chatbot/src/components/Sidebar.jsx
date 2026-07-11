import {
    Dashboard,
    Chat,
    Mood,
    Book,
    Person,
    Logout
} from "@mui/icons-material";

import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/sidebar.css";

export default function Sidebar() {

    const { logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login", { replace: true });

    };

    return (

        <div className="sidebar">

            <h2>

                🧠 Wellness AI

            </h2>

            <NavLink 
                to="/dashboard"
                className={({ isActive }) =>
                    `sidebar-link ${isActive ? "active-link" : ""}`
                }
            >

                <Dashboard />

                Dashboard

            </NavLink>

            <NavLink 
                to="/chat"
                className={({ isActive }) =>
                    `sidebar-link ${isActive ? "active-link" : ""}`
                }
            >

                <Chat />

                AI Chat

            </NavLink>

            <NavLink 
                to="/mood"
                className={({ isActive }) =>
                    `sidebar-link ${isActive ? "active-link" : ""}`
                }
            >

                <Mood />

                Mood Tracker

            </NavLink>

            <NavLink 
                to="/journal"
                className={({ isActive }) =>
                    `sidebar-link ${isActive ? "active-link" : ""}`
                }
            >

                <Book />

                Journal

            </NavLink>

            <NavLink 
                to="/profile"
                className={({ isActive }) =>
                    `sidebar-link ${isActive ? "active-link" : ""}`
                }
            >

                <Person />

                Profile

            </NavLink>

            <button

                className="logout-btn"

                onClick={handleLogout}

            >

                <Logout />

                Logout

            </button>

        </div>

    );

}