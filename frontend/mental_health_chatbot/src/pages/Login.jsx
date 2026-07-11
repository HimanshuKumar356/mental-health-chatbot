import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/auth";

import { useAuth } from "../context/AuthContext";

import "../styles/login.css";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            const data = await loginUser(
                email,
                password
            );

            login(
                data.token,
                data.user
            );

            navigate("/dashboard");

        }

        catch(err){

            setError(
                err.response?.data?.error ||
                "Login failed."
            );

        }

    };

    return(

        <div className="login-container">

            <form
                className="login-card"
                onSubmit={handleSubmit}
            >

                <h1>

                    AI Mental Wellness

                </h1>

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

                {

                    error &&

                    <p
                        style={{
                            color:"red",
                            marginBottom:"10px"
                        }}
                    >

                        {error}

                    </p>

                }

                <button>

                    Login

                </button>

            </form>

        </div>

    );

}