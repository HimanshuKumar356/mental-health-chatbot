import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../api/auth";

import "../styles/register.css";

export default function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setSuccess("");

        if(password !== confirmPassword){

            setError("Passwords do not match.");

            return;

        }

        try{

            const data = await registerUser({

                name,

                email,

                password

            });

            setSuccess(

                data.message ||

                "Registration successful."

            );

            setTimeout(()=>{

                navigate("/login");

            },1500);

        }

        catch(err){

            setError(

                err.response?.data?.error ||

                "Registration failed."

            );

        }

    };

    return(

        <div className="register-container">

            <form

                className="register-card"

                onSubmit={handleSubmit}

            >

                <h1>

                    Create Account

                </h1>

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

                <input

                    type="password"

                    placeholder="Confirm Password"

                    value={confirmPassword}

                    onChange={(e)=>setConfirmPassword(e.target.value)}

                    required

                />

                {

                    error &&

                    <p style={{color:"red"}}>

                        {error}

                    </p>

                }

                {

                    success &&

                    <p style={{color:"green"}}>

                        {success}

                    </p>

                }

                <button>

                    Register

                </button>

                <div className="login-link">

                    Already have an account?

                    {" "}

                    <Link to="/login">

                        Login

                    </Link>

                </div>

            </form>

        </div>

    );

}