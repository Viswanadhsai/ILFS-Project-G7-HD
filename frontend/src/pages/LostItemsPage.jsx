import React, { useEffect, useMemo, useState } from "react";
import api from "../api/client";

const initialFilters = {
    location: "",
    date: "",
    category: ""
};

export default function LostItemsPage() {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState(initialFilters);
    const [message, setMessage] = useState(null);

    const categories = useMemo(
        () => [...new Set(items.map((item) => item.category).filter(Boolean))],
        [items]
    );

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const locationMatch = item.location?.toLowerCase().includes(filters.location.toLowerCase());
            const dateMatch = !filters.date || item.date === filters.date;
            const categoryMatch = !filters.category || item.category === filters.category;
            return locationMatch && dateMatch && categoryMatch;
        });
    }, [items, filters]);

    const loadItems = () => {
        api.get("/lost")
            .then((res) => setItems(res.data))
            .catch((err) => {
                console.error("Error fetching lost items:", err);
                setMessage({ type: "error", text: "Unable to load lost items." });
            });
    };

    useEffect(() => {
        loadItems();
    }, []);

    const markReturned = async (id) => {
        try {
            await api.patch(`/lost/${id}/return`);
            setMessage({ type: "success", text: "Lost item marked as returned." });
            loadItems();
        } catch (err) {
            console.error("Error marking lost item returned:", err);
            setMessage({ type: "error", text: "Could not update this item." });
        }
    };

    return (
        <div className="page-shell">
            <div className="page-header">
                <div>
                    <p className="eyebrow">Inventory</p>
                    <h1>Lost Items List</h1>
                </div>
                <span className="count-pill">{filteredItems.length} shown</span>
            </div>

            {message && <div className={`app-message ${message.type}`}>{message.text}</div>}

            <div className="filter-bar">
                <input
                    className="filter-input"
                    placeholder="Filter by location"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
                <input
                    className="filter-input"
                    type="date"
                    value={filters.date}
                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                />
                <select
                    className="filter-input"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                    <option value="">All categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <button className="secondary-btn" type="button" onClick={() => setFilters(initialFilters)}>
                    Clear
                </button>
            </div>

            <div className="table-card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.location}</td>
                                <td>{item.date}</td>
                                <td>{item.description || "-"}</td>
                                <td><span className={`status-pill ${item.status}`}>{item.status}</span></td>
                                <td>
                                    {item.status !== "returned" ? (
                                        <button className="table-action-btn" onClick={() => markReturned(item._id)}>
                                            Mark Returned
                                        </button>
                                    ) : (
                                        <span className="muted-text">Complete</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filteredItems.length === 0 && (
                            <tr>
                                <td colSpan="7" className="empty-state">No lost items match these filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
