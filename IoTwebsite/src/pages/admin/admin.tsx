import { useEffect, useState } from "react";
import "./Admin.css";

export default function Admin() {
    const [professors, setProfessors] = useState<any[]>([]);
    const [filterDepartment, setFilterDepartment] = useState<string>("all");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<any>(null);

    const [dates, setDates] = useState<any[]>([]);
    const [editingDateId, setEditingDateId] = useState<number | null>(null);
    const [editDateForm, setEditDateForm] = useState<any>(null);
    const [newDateForm, setNewDateForm] = useState({ date: '', event_text: '' });

    const fetchProfessors = () => {
        let url = "http://localhost:3001/professors";
        if (filterDepartment !== "all") {
            url += `?department=${filterDepartment}`;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => setProfessors(data));
    };

    const fetchDates = () => {
        fetch("http://localhost:3001/api/important-dates")
            .then(res => res.json())
            .then(data => setDates(data))
            .catch(err => console.error("Error fetching dates:", err));
    };

    useEffect(() => {
        fetchProfessors();
    }, [filterDepartment]);

    useEffect(() => {
        fetchDates();
    }, []);

    const handleEditClick = (p: any) => {
        setEditingId(p.id);
        setEditFormData({ ...p });
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setEditFormData(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let finalValue: any = value;

        if (type === 'checkbox') {
            finalValue = (e.target as HTMLInputElement).checked ? 1 : 0;
        } else if (name === 'sort_order') {
            finalValue = parseInt(value, 10);
        } else if (name === 'education_history' || name === 'expertise') {
            try {
                // If it looks like JSON, try to keep it as object/array if it was one
                // But for the input field, we just track the string
                finalValue = value;
            } catch (e) {
                finalValue = value;
            }
        }

        setEditFormData({
            ...editFormData,
            [name]: finalValue,
        });
    };

    const handleSaveClick = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3001/professors/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editFormData),
            });

            if (response.ok) {
                setEditingId(null);
                setEditFormData(null);
                fetchProfessors();
            } else {
                const errorData = await response.json();
                alert(`Failed to update professor: ${errorData.error || response.statusText}`);
            }
        } catch (error) {
            console.error("Error updating professor:", error);
            alert("Error updating professor");
        }
    };

    const handleDateEditClick = (d: any) => {
        setEditingDateId(d.id);
        setEditDateForm({ ...d });
    };

    const handleDateCancelClick = () => {
        setEditingDateId(null);
        setEditDateForm(null);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditDateForm({ ...editDateForm, [name]: value });
    };

    const handleDateSaveClick = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3001/api/important-dates/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editDateForm),
            });
            if (response.ok) {
                setEditingDateId(null);
                setEditDateForm(null);
                fetchDates();
            } else {
                alert("Failed to update date");
            }
        } catch (error) {
            console.error("Error updating date:", error);
        }
    };

    const handleDateDeleteClick = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this date?")) return;
        try {
            const response = await fetch(`http://localhost:3001/api/important-dates/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchDates();
            }
        } catch (error) {
            console.error("Error deleting date:", error);
        }
    };

    const handleNewDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewDateForm({ ...newDateForm, [name]: value });
    };

    const handleNewDateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/important-dates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDateForm),
            });
            if (response.ok) {
                setNewDateForm({ date: '', event_text: '' });
                fetchDates();
            }
        } catch (error) {
            console.error("Error creating date:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Professor Table</h1>

            <div className="admin-controls">
                <label htmlFor="dept-filter">Filter by Department: </label>
                <select
                    id="dept-filter"
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="dept-select"
                >
                    <option value="all">All Departments</option>
                    <option value="iot">IoT</option>
                    <option value="phys">Physics</option>
                </select>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Dept. ID</th>
                            <th>Name (TH)</th>
                            <th>Position</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Is Head</th>
                            <th>Edu. History</th>
                            <th>Expertise</th>
                            <th>Sort Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {professors.map((p) => (
                            <tr key={p.id}>
                                {editingId === p.id ? (
                                    <>
                                        <td>{p.id}</td>
                                        <td><input type="text" name="department_id" value={editFormData.department_id} onChange={handleChange} className="edit-input" /></td>
                                        <td><input type="text" name="name_th" value={editFormData.name_th} onChange={handleChange} className="edit-input" /></td>
                                        <td><input type="text" name="position" value={editFormData.position} onChange={handleChange} className="edit-input" /></td>
                                        <td><input type="text" name="image" value={editFormData.image} onChange={handleChange} className="edit-input" /></td>
                                        <td><input type="text" name="email" value={editFormData.email} onChange={handleChange} className="edit-input" /></td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                name="is_head"
                                                checked={!!editFormData.is_head}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td><input type="text" name="education_history" value={typeof editFormData.education_history === 'string' ? editFormData.education_history : JSON.stringify(editFormData.education_history)} onChange={handleChange} className="edit-input" /></td>
                                        <td><input type="text" name="expertise" value={typeof editFormData.expertise === 'string' ? editFormData.expertise : JSON.stringify(editFormData.expertise)} onChange={handleChange} className="edit-input" /></td>
                                        <td><input type="number" name="sort_order" value={editFormData.sort_order} onChange={handleChange} className="edit-input" style={{ width: '60px' }} /></td>
                                        <td className="actions-cell">
                                            <button onClick={() => handleSaveClick(p.id)} className="btn-save">Save</button>
                                            <button onClick={handleCancelClick} className="btn-cancel">Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{p.id}</td>
                                        <td>{p.department_id}</td>
                                        <td>{p.name_th}</td>
                                        <td>{p.position}</td>
                                        <td>
                                            {p.image ? (
                                                <img src={p.image} alt={p.name_th || 'Professor'} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                            ) : (
                                                "No Image"
                                            )}
                                        </td>
                                        <td>{p.email}</td>
                                        <td>{p.is_head ? "Yes" : "No"}</td>
                                        <td style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={typeof p.education_history === 'string' ? p.education_history : JSON.stringify(p.education_history)}>
                                            {typeof p.education_history === 'string' ? p.education_history : JSON.stringify(p.education_history)}
                                        </td>
                                        <td style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={typeof p.expertise === 'string' ? p.expertise : JSON.stringify(p.expertise)}>
                                            {typeof p.expertise === 'string' ? p.expertise : JSON.stringify(p.expertise)}
                                        </td>
                                        <td>{p.sort_order}</td>
                                        <td className="actions-cell">
                                            <button onClick={() => handleEditClick(p)} className="btn-edit">Edit</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="admin-table-wrapper" style={{ marginTop: '4rem', paddingBottom: '2rem' }}>
                <h1 className="admin-title" style={{ marginTop: '2rem' }}>Important Dates</h1>

                <form onSubmit={handleNewDateSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '1rem 2rem', background: '#1e1e1e', borderRadius: '8px' }}>
                    <input type="date" name="date" value={newDateForm.date} onChange={handleNewDateChange} className="edit-input" required />
                    <input type="text" name="event_text" value={newDateForm.event_text} onChange={handleNewDateChange} className="edit-input" placeholder="Event Name" required style={{ flex: 1 }} />
                    <button type="submit" className="btn-save">Add Date</button>
                </form>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Event Text</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dates.map((d) => (
                            <tr key={d.id}>
                                {editingDateId === d.id ? (
                                    <>
                                        <td><input type="date" name="date" value={editDateForm.date} onChange={handleDateChange} className="edit-input" /></td>
                                        <td><input type="text" name="event_text" value={editDateForm.event_text} onChange={handleDateChange} className="edit-input" /></td>
                                        <td className="actions-cell">
                                            <button onClick={() => handleDateSaveClick(d.id)} className="btn-save">Save</button>
                                            <button onClick={handleDateCancelClick} className="btn-cancel">Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{d.date}</td>
                                        <td>{d.event_text}</td>
                                        <td className="actions-cell">
                                            <button onClick={() => handleDateEditClick(d)} className="btn-edit">Edit</button>
                                            <button onClick={() => handleDateDeleteClick(d.id)} className="btn-cancel">Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}