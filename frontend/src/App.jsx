import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardLayout from "./layout/DashboardLayout";

import HomePage from "./pages/HomePage";
import LostForm from "./pages/LostForm";
import FoundForm from "./pages/FoundForm";
import LostItemsPage from "./pages/LostItemsPage";
import FoundItemsPage from "./pages/FoundItemsPage";
import MatchingPage from "./pages/MatchingPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* PUBLIC ROUTES */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* PROTECTED ROUTES */}
                <Route path="/home" element={<DashboardLayout><HomePage /></DashboardLayout>} />
                <Route path="/lost-form" element={<DashboardLayout><LostForm /></DashboardLayout>} />
                <Route path="/found-form" element={<DashboardLayout><FoundForm /></DashboardLayout>} />
                <Route path="/lost-items" element={<DashboardLayout><LostItemsPage /></DashboardLayout>} />
                <Route path="/found-items" element={<DashboardLayout><FoundItemsPage /></DashboardLayout>} />
                <Route path="/matching" element={<DashboardLayout><MatchingPage /></DashboardLayout>} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
