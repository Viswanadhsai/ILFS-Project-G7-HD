import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MatchingPage() {
    const [matches, setMatches] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/matching")
            .then(res => setMatches(res.data))
            .catch(err => console.error("MATCHING ERROR:", err));
    }, []);

    const notifyStudent = async (match) => {
        try {
            await axios.post("http://localhost:5000/matching/notify", {
                studentId: match.studentId,   // <-- This will be fixed AFTER we see match object
                message: "Your lost item has been matched with a found item."
            });

            setMessage("Notification sent successfully!");
        } catch (err) {
            console.error("NOTIFY ERROR:", err);
            setMessage("Failed to notify student");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Matching Items</h2>

            {message && (
                <div style={{ background: "#d4edda", padding: "10px", marginBottom: "15px" }}>
                    {message}
                </div>
            )}

            {matches.length === 0 && <p>No matches found.</p>}

            {matches.map((m, index) => {
                console.log("MATCH OBJECT:", m);   // <-- REQUIRED FOR FIXING NOTIFY

                return (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "8px"
                        }}
                    >
                        <h3>
                            {m.name}
                            {typeof m.score === "number" && (
                                <span
                                    style={{
                                        background: "#4caf50",
                                        color: "white",
                                        padding: "4px 8px",
                                        borderRadius: "6px",
                                        marginLeft: "10px",
                                        fontSize: "14px"
                                    }}
                                >
                                    Score: {m.score}%
                                </span>
                            )}
                        </h3>

                        <p><strong>Category:</strong> {m.category}</p>
                        <p><strong>Lost Location:</strong> {m.lostLocation}</p>
                        <p><strong>Found Location:</strong> {m.foundLocation}</p>
                        <p><strong>Lost Date:</strong> {m.lostDate}</p>
                        <p><strong>Found Date:</strong> {m.foundDate}</p>

                        <button
                            onClick={() => notifyStudent(m)}
                            style={{
                                marginTop: "10px",
                                padding: "8px 12px",
                                background: "#2196f3",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Notify Student
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
