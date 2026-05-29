import React, { useState } from "react";
import api from "../api/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function LostForm() {
    const [form, setForm] = useState({
        name: "",
        category: "",
        location: "",
        description: "",
    });

    const [date, setDate] = useState(null);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const categories = [
        "Electronics",
        "Wallets",
        "Bags",
        "Documents",
        "Clothing",
        "Accessories",
        "Keys",
        "Others",
    ];

    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Item name is required";
        if (!form.category) newErrors.category = "Category is required";
        if (!form.location.trim()) newErrors.location = "Location is required";
        if (!date) newErrors.date = "Date is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            ...form,
            date: date.toISOString().split("T")[0],
            studentId: user?.studentId || user?.id || user?.email || "UNKNOWN",
        };

        try {
            await api.post("/lost", payload);
            setMessage({ type: "success", text: "Lost item reported successfully." });

            setForm({ name: "", category: "", location: "", description: "" });
            setDate(null);
            setErrors({});
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: err.response?.data?.message || "Failed to submit lost item." });
        }
    };

    return (
        <div className="page-shell">
            <div className="page-header">
                <div>
                    <p className="eyebrow">Create report</p>
                    <h1>Report Lost Item</h1>
                </div>
            </div>

            {message && <div className={`app-message ${message.type}`}>{message.text}</div>}

            <form className="form-card" onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    className="input-box"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p className="field-error">{errors.name}</p>}

                <label>Category</label>
                <select
                    className="input-box"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                {errors.category && <p className="field-error">{errors.category}</p>}

                <label>Location</label>
                <input
                    className="input-box"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
                {errors.location && <p className="field-error">{errors.location}</p>}

                <label>Date</label>
                <DatePicker
                    selected={date}
                    onChange={(d) => setDate(d)}
                    className="input-box"
                    dateFormat="yyyy-MM-dd"
                />
                {errors.date && <p className="field-error">{errors.date}</p>}

                <label>Description (optional)</label>
                <textarea
                    className="input-box"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <button className="primary-btn" type="submit">
                    Submit Lost Item
                </button>
            </form>
        </div>
    );
}
