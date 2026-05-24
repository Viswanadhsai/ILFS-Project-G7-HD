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

    const user = JSON.parse(localStorage.getItem("user")); // ⭐ get logged-in user

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
            studentId: user?.studentId || "UNKNOWN", // ⭐ REQUIRED FIELD
        };

        try {
            await api.post("/lost", payload);
            alert("Lost item reported successfully");

            setForm({ name: "", category: "", location: "", description: "" });
            setDate(null);
        } catch (err) {
            console.error(err);
            alert("Failed to submit");
        }
    };

    return (
        <div style={{ color: "white" }}>
            <h1>Report Lost Item</h1>

            <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
                <label>Name</label>
                <input
                    className="input-box"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

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
                {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}

                <label>Location</label>
                <input
                    className="input-box"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
                {errors.location && <p style={{ color: "red" }}>{errors.location}</p>}

                <label>Date</label>
                <DatePicker
                    selected={date}
                    onChange={(d) => setDate(d)}
                    className="input-box"
                    dateFormat="yyyy-MM-dd"
                />
                {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}

                <label>Description (optional)</label>
                <textarea
                    className="input-box"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <button className="login-btn" type="submit">
                    Submit Lost Item
                </button>
            </form>
        </div>
    );
}
