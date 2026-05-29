import React, { useEffect, useState } from "react";
import api from "../api/client";

export default function MatchingPage() {
    const [matches, setMatches] = useState([]);
    const [message, setMessage] = useState(null);
    const [notifyingId, setNotifyingId] = useState(null);

    useEffect(() => {
        api.get("/matching")
            .then((res) => setMatches(res.data))
            .catch((err) => {
                console.error("MATCHING ERROR:", err);
                setMessage({ type: "error", text: "Unable to load potential matches." });
            });
    }, []);

    const notifyUser = async (match) => {
        setNotifyingId(match.lostId);
        setMessage(null);

        try {
            const res = await api.post(`/matching/notify/${match.lostId}`, {
                message: `Your lost item "${match.name}" may match a found item.`
            });

            setMessage({ type: "success", text: res.data.message || "Notification sent successfully." });
        } catch (err) {
            console.error("NOTIFY ERROR:", err);
            setMessage({ type: "error", text: err.response?.data?.message || "Failed to notify user." });
        } finally {
            setNotifyingId(null);
        }
    };

    return (
        <div className="page-shell">
            <div className="page-header">
                <div>
                    <p className="eyebrow">Matching engine</p>
                    <h1>Potential Matches</h1>
                </div>
                <span className="count-pill">{matches.length} matches</span>
            </div>

            {message && <div className={`app-message ${message.type}`}>{message.text}</div>}

            {matches.length === 0 ? (
                <div className="empty-panel">No matches found yet.</div>
            ) : (
                <div className="match-grid">
                    {matches.map((match) => (
                        <div key={`${match.lostId}-${match.foundId}`} className="match-card">
                            <div className="match-card-header">
                                <div>
                                    <p className="eyebrow">Matched item</p>
                                    <h2>{match.name}</h2>
                                </div>
                                {typeof match.score === "number" && (
                                    <span className="score-pill">{match.score}%</span>
                                )}
                            </div>

                            <div className="match-details">
                                <div><span>Category</span>{match.category}</div>
                                <div><span>Lost location</span>{match.lostLocation}</div>
                                <div><span>Found location</span>{match.foundLocation}</div>
                                <div><span>Lost date</span>{match.lostDate}</div>
                                <div><span>Found date</span>{match.foundDate}</div>
                            </div>

                            <button
                                className="primary-btn"
                                onClick={() => notifyUser(match)}
                                disabled={notifyingId === match.lostId}
                            >
                                {notifyingId === match.lostId ? "Sending..." : "Notify User"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
