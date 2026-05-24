import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔥 DEBUG LOG ADDED HERE
        console.log("STATE:", name, email, password);

        if (!name || !email || !password) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Registration failed");
                return;
            }

            alert("Registration successful! Please log in.");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="login-page">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2>Register</h2>

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
