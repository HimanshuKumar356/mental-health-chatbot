import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api/auth";

import { useNotification } from "../context/NotificationContext";

import "../styles/auth.css";

export default function Register() {

    const navigate = useNavigate();

    const { showNotification } = useNotification();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await registerUser(

                name,

                email,

                password

            );

            showNotification(

                "Registration successful! Please login.",

                "success"

            );

            navigate("/login");

        }

        catch (err) {

            showNotification(

                err.response?.data?.error ||

                "Registration failed.",

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

                    Create Account

                </h2>

                <input

                    type="text"

                    placeholder="Full Name"

                    value={name}

                    onChange={(e)=>setName(e.target.value)}

                    required

                />

                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                    required

                />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                    required

                />

                <button

                    type="submit"

                    disabled={loading}

                >

                    {

                        loading

                        ?

                        "Creating Account..."

                        :

                        "Register"

                    }

                </button>

                <p>

                    Already have an account?

                    {" "}

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </form>

        </div>

    );

}