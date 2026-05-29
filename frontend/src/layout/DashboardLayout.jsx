import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === "/home";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <button className="brand-btn" type="button" onClick={() => navigate("/home")}>
                    ILFS - Lost & Found System
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className={`dashboard-body ${isHome ? "dashboard-body-home" : ""}`}>
                {!isHome && (
                    <div className="sidebar">
                        <button onClick={() => navigate("/home")}>Home</button>
                        <button onClick={() => navigate("/lost-form")}>Report Lost Item</button>
                        <button onClick={() => navigate("/found-form")}>Report Found Item</button>
                        <button onClick={() => navigate("/lost-items")}>Lost Items List</button>
                        <button onClick={() => navigate("/found-items")}>Found Items List</button>
                        <button onClick={() => navigate("/matching")}>Potential Matches</button>
                    </div>
                )}

                <div className="content-area">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
