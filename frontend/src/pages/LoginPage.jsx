import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage({ type: "error", text: "Enter email and password." });
            return;
        }

        try {
            setMessage(null);
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setMessage({ type: "error", text: data.message || "Login failed." });
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/home");

        } catch (err) {
            console.error("Login Error:", err);
            setMessage({ type: "error", text: `Could not reach the backend at ${API_URL}. Please check the backend is running.` });
        }
    };

    return (
        <div className="login-page">

            <div className="welcome-text">
                Welcome to Intelligent Lost & Found System
            </div>

            <form className="login-box" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {message && <div className={`app-message ${message.type}`}>{message.text}</div>}

                <input
                    type="email"
                    placeholder="Email"
                    className="input-box"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input-box"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="login-btn">
                    Login
                </button>

                <button
                    type="button"
                    className="login-btn"
                    onClick={() => navigate("/register")}
                >
                    Register
                </button>
            </form>
        </div>
    );
}
