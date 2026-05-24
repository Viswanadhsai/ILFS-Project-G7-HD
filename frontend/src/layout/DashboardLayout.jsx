import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>ILFS – Lost & Found System</div>
                <button className="logout-btn" onClick={() => navigate("/")}>
                    Logout
                </button>
            </div>

            <div className="dashboard-body">
                <div className="sidebar">

                    {/* FIXED ORDER */}
                    <button onClick={() => navigate("/lost-form")}>Report Lost Item</button>
                    <button onClick={() => navigate("/found-form")}>Report Found Item</button>
                    <button onClick={() => navigate("/lost-items")}>Lost Items</button>
                    <button onClick={() => navigate("/found-items")}>Found Items</button>
                    <button onClick={() => navigate("/matching")}>Matching</button>

                </div>

                <div className="content-area">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
