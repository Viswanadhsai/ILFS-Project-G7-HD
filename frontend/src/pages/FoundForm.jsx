import React, { useState } from "react";
import api from "../api/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FoundForm() {
    const [form, setForm] = useState({
        name: "",
        category: "",
        location: "",
        description: "",
        foundBy: "",
    });

    const [date, setDate] = useState(null);
    const [errors, setErrors] = useState({});

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
        if (!form.foundBy.trim()) newErrors.foundBy = "Found by is required";
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
        };

        try {
            await api.post("/found", payload);
            alert("Found item reported successfully");

            setForm({
                name: "",
                category: "",
                location: "",
                description: "",
                foundBy: "",
            });
            setDate(null);
        } catch (err) {
            console.error(err);
            alert("Failed to submit");
        }
    };

    return (
        <div style={{ color: "white" }}>
            <h1>Report Found Item</h1>

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

                <label>Location Found</label>
                <input
                    className="input-box"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
                {errors.location && <p style={{ color: "red" }}>{errors.location}</p>}

                <label>Found By</label>
                <input
                    className="input-box"
                    value={form.foundBy}
                    onChange={(e) => setForm({ ...form, foundBy: e.target.value })}
                />
                {errors.foundBy && <p style={{ color: "red" }}>{errors.foundBy}</p>}

                <label>Date Found</label>
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
                    Submit Found Item
                </button>
            </form>
        </div>
    );
}
