import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../api/auth";

import { useAuth } from "../context/AuthContext";

import { useNotification } from "../context/NotificationContext";

import "../styles/auth.css";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const { showNotification } = useNotification();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const data = await loginUser(

                email,

                password

            );

            login(

                data.token,

                data.user

            );

            showNotification(

                "Welcome back!",

                "success"

            );

            navigate("/dashboard");

        }

        catch (err) {

            showNotification(

                err.response?.data?.error ||

                "Login failed.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-container">

            <form

                className="auth-card"

                onSubmit={handleSubmit}

            >

                <h2>

                    Welcome Back

                </h2>

                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e)=>

                        setEmail(e.target.value)

                    }

                    required

                />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>

                        setPassword(e.target.value)

                    }

                    required

                />

                <button

                    type="submit"

                    disabled={loading}

                >

                    {

                        loading

                        ?

                        "Signing In..."

                        :

                        "Login"

                    }

                </button>

                <p>

                    Don't have an account?

                    {" "}

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </form>

        </div>

    );

}