import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setMessage({ type: "error", text: "All fields are required." });
            return;
        }

        try {
            setMessage(null);
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setMessage({ type: "error", text: data.message || "Registration failed." });
                return;
            }

            setMessage({ type: "success", text: "Registration successful. Please log in." });
            setTimeout(() => navigate("/"), 900);
        } catch (err) {
            console.error("Registration request failed:", err);
            setMessage({ type: "error", text: `Could not reach the backend at ${API_URL}. Please check the backend is running.` });
        }
    };

    return (
        <div className="login-page">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2>Register</h2>
                {message && <div className={`app-message ${message.type}`}>{message.text}</div>}

                <input
                    type="text"
                    placeholder="Name"
                    className="input-box"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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
                    Register
                </button>

                <button
                    type="button"
                    className="login-btn"
                    onClick={() => navigate("/")}
                >
                    Back to Login
                </button>
            </form>
        </div>
    );
}
