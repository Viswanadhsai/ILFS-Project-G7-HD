import React from "react";
import { useNavigate } from "react-router-dom";

const actions = [
    { label: "Report Lost Item", path: "/lost-form" },
    { label: "Report Found Item", path: "/found-form" },
    { label: "Lost Items List", path: "/lost-items" },
    { label: "Found Items List", path: "/found-items" },
    { label: "Potential Matches", path: "/matching" }
];

export default function HomePage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <div className="home-page">
            <div className="home-heading">
                <h1>Welcome{user.name ? `, ${user.name}` : ""}</h1>
                <p>Select an action to continue.</p>
            </div>

            <div className="home-actions">
                {actions.map((action) => (
                    <button
                        key={action.path}
                        type="button"
                        className="home-action-btn"
                        onClick={() => navigate(action.path)}
                    >
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
