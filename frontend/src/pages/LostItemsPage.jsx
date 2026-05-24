import React, { useEffect, useState } from "react";
import api from "../api/client";

export default function LostItemsPage() {
    const [items, setItems] = useState([]);

    const loadItems = () => {
        api.get("/lost")
            .then(res => setItems(res.data))
            .catch(err => console.error("Error fetching lost items:", err));
    };

    useEffect(() => {
        loadItems();
    }, []);

    const markReturned = async (id) => {
        await api.patch(`/lost/${id}/return`);
        loadItems();
    };

    return (
        <div>
            <h1>Lost Items</h1>

            <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "20px" }}>
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
                    {items.map(item => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.location}</td>
                            <td>{item.date}</td>
                            <td>{item.description || "-"}</td>
                            <td>{item.status}</td>
                            <td>
                                {item.status !== "returned" && (
                                    <button onClick={() => markReturned(item._id)}>
                                        Mark Returned
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
