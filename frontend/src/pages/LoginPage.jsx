import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Enter email and password");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            // ⭐ Save JWT token
            localStorage.setItem("token", data.token);

            // ⭐ Save logged-in user (IMPORTANT)
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/lost-form");

        } catch (err) {
            console.error("Login Error:", err);
            alert("Server error");
        }
    };

    return (
        <div className="login-page">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2>Login</h2>

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
