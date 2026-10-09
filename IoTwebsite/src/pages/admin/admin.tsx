import { useEffect, useState } from "react";
import "./Admin.css";

export default function Admin() {
    const [professors, setProfessors] = useState<any[]>([]);
    const [staff, setStaff] = useState<any[]>([]);
    const [filterDepartment, setFilterDepartment] = useState<string>("all");

    // Professor editing
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<any>(null);
    const [newProfessorForm, setNewProfessorForm] = useState({
        id: '', department_id: 'iot', name_th: '', position: '', image: '', email: '',
        is_head: 0, education_history: '[]', expertise: '[]', research: '[]', sort_order: 0
    });

    // Staff editing
    const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
    const [editStaffFormData, setEditStaffFormData] = useState<any>(null);
    const [newStaffForm, setNewStaffForm] = useState({
        id: '', department_id: 'iot', name_th: '', position: '', image: '', email: '',
        education_history: '[]', expertise: '[]', sort_order: 0
    });

    // Dates
    const [dates, setDates] = useState<any[]>([]);
    const [newDateForm, setNewDateForm] = useState({ date: '', event_text: '' });

    // Curriculum
    const [currProgram, setCurrProgram] = useState<string>("iot");
    const [currYears, setCurrYears] = useState<string[]>([]);
    const [currSelectedYear, setCurrSelectedYear] = useState<string>("");
    const [newYear, setNewYear] = useState<string>("");
    const [currMetadata, setCurrMetadata] = useState({ pdfUrl: "", pdfLabel: "" });
    const [isSavingCurr, setIsSavingCurr] = useState(false);
    const [currCourses, setCurrCourses] = useState<any[]>([]);
    const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
    const [editCourseForm, setEditCourseForm] = useState<any>(null);
    const [newCourseForm, setNewCourseForm] = useState({
        id: '', name: '', description: '', col: 1, row: 1, row_span: 1, class_name: '',
        mobile_col: 1, mobile_row: 1, mobile_col_span: 1, mobile_row_span: 1, plan_group: '', plan_label: ''
    });

    // --- FETCHERS ---
    const fetchProfessors = () => {
        let url = "/professors";
        if (filterDepartment !== "all") url += `?department=${filterDepartment}`;
        fetch(url).then(res => res.json()).then(data => setProfessors(data));
    };

    const fetchStaff = () => {
        let url = "/api/staff";
        if (filterDepartment !== "all") url += `?department=${filterDepartment}`;
        fetch(url).then(res => res.json()).then(data => setStaff(data));
    };

    const fetchDates = () => {
        fetch("/api/important-dates")
            .then(res => res.json())
            .then(data => setDates(data));
    };

    useEffect(() => {
        fetchProfessors();
        fetchStaff();
    }, [filterDepartment]);

    useEffect(() => {
        fetchDates();
    }, []);

    useEffect(() => {
        const fetchYears = async () => {
            try {
                const res = await fetch(`/api/curriculum/${currProgram}/years`);
                const years = await res.json();
                setCurrYears(years);
                if (years.length > 0 && !currSelectedYear) setCurrSelectedYear(years[0]);
            } catch (err) { console.error(err); }
        };
        fetchYears();
    }, [currProgram]);

    const fetchCurrCourses = async () => {
        if (!currSelectedYear) return;
        try {
            const res = await fetch(`/api/curriculum/${currProgram}/${currSelectedYear}`);
            const data = await res.json();
            // Sort by Column, then Row, then Name to match the visual curriculum structure
            const sortedData = [...data].sort((a, b) => {
                if (a.col !== b.col) return a.col - b.col;
                if (a.row !== b.row) return a.row - b.row;
                return (a.name || "").localeCompare(b.name || "");
            });
            setCurrCourses(sortedData);
        } catch (err) { console.error(err); }
    };

    useEffect(() => {
        if (!currSelectedYear) return;
        const fetchMetadata = async () => {
            try {
                const res = await fetch(`/api/curriculum/${currProgram}/${currSelectedYear}/metadata`);
                const meta = await res.json();
                setCurrMetadata({ pdfUrl: meta.pdfUrl || "", pdfLabel: meta.pdfLabel || "" });
            } catch (err) { console.error(err); }
        };
        fetchMetadata();
        fetchCurrCourses();
    }, [currProgram, currSelectedYear]);

    // --- UPLOAD HANDLER ---
    const handleImageUpload = async (file: File, callback: (url: string) => void) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.imageUrl) callback(data.imageUrl);
        } catch (err) {
            console.error("Upload failed", err);
            alert("Upload failed");
        }
    };

    // --- PROFESSOR HANDLERS ---
    const handleEditClick = (p: any) => { setEditingId(p.id); setEditFormData({ ...p }); };

    const handleSaveClick = async (id: string) => {
        try {
            const res = await fetch(`/professors/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editFormData),
            });
            if (res.ok) { setEditingId(null); fetchProfessors(); }
        } catch (error) { console.error(error); }
    };

    const handleDeleteClick = async (id: string) => {
        if (!window.confirm("Delete this professor?")) return;
        try {
            const res = await fetch(`/professors/${id}`, { method: "DELETE" });
            if (res.ok) fetchProfessors();
        } catch (error) { console.error(error); }
    };

    const handleNewProfessorSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/professors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProfessorForm),
            });
            if (res.ok) {
                setNewProfessorForm({
                    id: '', department_id: 'iot', name_th: '', position: '', image: '', email: '',
                    is_head: 0, education_history: '[]', expertise: '[]', research: '[]', sort_order: 0
                });
                fetchProfessors(); alert("Added!");
            }
        } catch (error) { console.error(error); }
    };

    // --- STAFF HANDLERS ---
    const handleStaffEditClick = (s: any) => { setEditingStaffId(s.id); setEditStaffFormData({ ...s }); };

    const handleStaffSaveClick = async (id: string) => {
        try {
            const res = await fetch(`/api/staff/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editStaffFormData),
            });
            if (res.ok) { setEditingStaffId(null); fetchStaff(); }
        } catch (err) { console.error(err); }
    };

    const handleStaffDeleteClick = async (id: string) => {
        if (!window.confirm("Delete this staff?")) return;
        try {
            const res = await fetch(`/api/staff/${id}`, { method: "DELETE" });
            if (res.ok) fetchStaff();
        } catch (err) { console.error(err); }
    };

    const handleNewStaffSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/staff", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newStaffForm),
            });
            if (res.ok) {
                setNewStaffForm({
                    id: '', department_id: 'iot', name_th: '', position: '', image: '', email: '',
                    education_history: '[]', expertise: '[]', sort_order: 0
                });
                fetchStaff(); alert("Added!");
            }
        } catch (err) { console.error(err); }
    };

    // --- CURRICULUM HANDLERS ---
    const handleSaveCurrMetadata = async () => {
        setIsSavingCurr(true);
        const yearToSave = newYear || currSelectedYear;
        try {
            const res = await fetch(`/api/curriculum/metadata`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    program: currProgram, curriculumYear: yearToSave,
                    pdfUrl: currMetadata.pdfUrl, pdfLabel: currMetadata.pdfLabel
                })
            });
            if (res.ok) {
                alert("Saved!");
                if (newYear) { setCurrSelectedYear(newYear); setNewYear(""); }
            }
        } catch (err) { console.error(err); } finally { setIsSavingCurr(false); }
    };

    const handleCourseEditClick = (c: any) => { setEditingCourseId(c.id); setEditCourseForm({ ...c }); };
    const handleCourseSaveClick = async (id: string) => {
        try {
            const res = await fetch(`/api/curriculum/${currProgram}/${currSelectedYear}/courses/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editCourseForm)
            });
            if (res.ok) { setEditingCourseId(null); fetchCurrCourses(); }
        } catch (err) { console.error(err); }
    };

    const handleNewCourseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/curriculum/${currProgram}/${currSelectedYear}/courses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCourseForm)
            });
            if (res.ok) {
                setNewCourseForm({
                    id: '', name: '', description: '', col: 1, row: 1, row_span: 1, class_name: '',
                    mobile_col: 1, mobile_row: 1, mobile_col_span: 1, mobile_row_span: 1, plan_group: '', plan_label: ''
                });
                fetchCurrCourses();
            }
        } catch (err) { console.error(err); }
    };

    const handleCourseDeleteClick = async (id: string) => {
        if (!window.confirm("Delete course?")) return;
        try {
            const res = await fetch(`/api/curriculum/${currProgram}/${currSelectedYear}/courses/${id}`, { method: "DELETE" });
            if (res.ok) fetchCurrCourses();
        } catch (err) { console.error(err); }
    };

    // --- DATE HANDLERS ---
    const handleDateDeleteClick = async (id: number) => {
        if (!window.confirm("Delete date?")) return;
        try { await fetch(`/api/important-dates/${id}`, { method: "DELETE" }); fetchDates(); } catch (err) { console.error(err); }
    };
    const handleNewDateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/important-dates", {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newDateForm)
            });
            if (res.ok) { setNewDateForm({ date: '', event_text: '' }); fetchDates(); }
        } catch (err) { console.error(err); }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Faculty & Staff Management</h1>

            <div className="admin-controls">
                <label>Filter by Dept: </label>
                <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} className="dept-select">
                    <option value="all">All</option>
                    <option value="iot">IoT</option>
                    <option value="phys">Physics</option>
                </select>
            </div>

            {/* --- PROFESSORS --- */}
            <div className="admin-table-wrapper" style={{ marginBottom: '3rem' }}>
                <h2 className="admin-title" style={{ fontSize: '1.5rem' }}>Professors</h2>
                <form onSubmit={handleNewProfessorSubmit} style={{ background: '#1e1e1e', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <input type="text" placeholder="ID" value={newProfessorForm.id} onChange={(e) => setNewProfessorForm({ ...newProfessorForm, id: e.target.value })} className="edit-input" style={{ width: '100px' }} required />
                    <select value={newProfessorForm.department_id} onChange={(e) => setNewProfessorForm({ ...newProfessorForm, department_id: e.target.value })} className="edit-input">
                        <option value="iot">IoT</option>
                        <option value="phys">Physics</option>
                    </select>
                    <input type="text" placeholder="Name TH" value={newProfessorForm.name_th} onChange={(e) => setNewProfessorForm({ ...newProfessorForm, name_th: e.target.value })} className="edit-input" required />
                    <input type="text" placeholder="Position" value={newProfessorForm.position} onChange={(e) => setNewProfessorForm({ ...newProfessorForm, position: e.target.value })} className="edit-input" />
                    <input type="email" placeholder="Email" value={newProfessorForm.email} onChange={(e) => setNewProfessorForm({ ...newProfessorForm, email: e.target.value })} className="edit-input" />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                        <input type="checkbox" checked={newProfessorForm.is_head === 1} onChange={(e) => setNewProfessorForm({ ...newProfessorForm, is_head: e.target.checked ? 1 : 0 })} />
                        <span>Head</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ color: '#aaa', fontSize: '0.8rem' }}>Image:</span>
                        <input type="file" accept="image/*" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], (url) => setNewProfessorForm({ ...newProfessorForm, image: url }))} />
                    </div>
                    <input type="number" placeholder="Sort" value={newProfessorForm.sort_order} onChange={(e) => setNewProfessorForm({ ...newProfessorForm, sort_order: Number(e.target.value) })} className="edit-input" style={{ width: '80px' }} />
                    <button type="submit" className="btn-save" style={{ padding: '0 20px' }}>Add Professor</button>
                    <div style={{ width: '100%', display: 'flex', gap: '1rem' }}>
                        <input placeholder="Edu History (JSON)" value={newProfessorForm.education_history} onChange={(e) => setNewProfessorForm({ ...newProfessorForm, education_history: e.target.value })} className="edit-input" style={{ flex: 1 }} />
                        <input placeholder="Expertise (JSON)" value={newProfessorForm.expertise} onChange={(e) => setNewProfessorForm({ ...newProfessorForm, expertise: e.target.value })} className="edit-input" style={{ flex: 1 }} />
                    </div>
                </form>
                <table className="admin-table">
                    <thead><tr><th>ID</th><th>Dept</th><th>Name</th><th>Email</th><th>Actions</th></tr></thead>
                    <tbody>
                        {professors.map(p => (
                            <tr key={p.id}>
                                {editingId === p.id ? (
                                    <td colSpan={5}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', background: '#333', padding: '1rem', borderRadius: '4px' }}>
                                            <select value={editFormData.department_id} onChange={(e) => setEditFormData({ ...editFormData, department_id: e.target.value })} className="edit-input">
                                                <option value="iot">IoT</option>
                                                <option value="phys">Physics</option>
                                            </select>
                                            <input value={editFormData.name_th} onChange={(e) => setEditFormData({ ...editFormData, name_th: e.target.value })} className="edit-input" placeholder="Name" />
                                            <input value={editFormData.position} onChange={(e) => setEditFormData({ ...editFormData, position: e.target.value })} className="edit-input" placeholder="Position" />
                                            <input value={editFormData.email} onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} className="edit-input" placeholder="Email" />
                                            <input type="number" value={editFormData.sort_order} onChange={(e) => setEditFormData({ ...editFormData, sort_order: Number(e.target.value) })} className="edit-input" style={{ width: '70px' }} />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                                                <input type="checkbox" checked={editFormData.is_head === 1 || editFormData.is_head === true} onChange={(e) => setEditFormData({ ...editFormData, is_head: e.target.checked ? 1 : 0 })} />
                                                <span>Head</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <input type="file" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], (url) => setEditFormData({ ...editFormData, image: url }))} />
                                            </div>
                                            <div style={{ width: '100%', display: 'flex', gap: '0.5rem' }}>
                                                <input value={JSON.stringify(editFormData.education_history)} onChange={(e) => setEditFormData({ ...editFormData, education_history: e.target.value })} className="edit-input" style={{ flex: 1 }} />
                                                <input value={JSON.stringify(editFormData.expertise)} onChange={(e) => setEditFormData({ ...editFormData, expertise: e.target.value })} className="edit-input" style={{ flex: 1 }} />
                                            </div>
                                            <button onClick={() => handleSaveClick(p.id)} className="btn-save">Save</button>
                                            <button onClick={() => setEditingId(null)} className="btn-cancel">Cancel</button>
                                        </div>
                                    </td>
                                ) : (
                                    <>
                                        <td>{p.id}</td>
                                        <td>{p.department_id}</td>
                                        <td>{p.name_th}</td>
                                        <td>{p.email}</td>
                                        <td>
                                            <button onClick={() => handleEditClick(p)} className="btn-edit">Edit</button>
                                            <button onClick={() => handleDeleteClick(p.id)} className="btn-cancel">Del</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- STAFF --- */}
            <div className="admin-table-wrapper" style={{ marginBottom: '3rem' }}>
                <h2 className="admin-title" style={{ fontSize: '1.5rem' }}>Supporting Staff</h2>
                <form onSubmit={handleNewStaffSubmit} style={{ background: '#1e1e1e', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <input type="text" placeholder="ID" value={newStaffForm.id} onChange={(e) => setNewStaffForm({ ...newStaffForm, id: e.target.value })} className="edit-input" style={{ width: '100px' }} required />
                    <select value={newStaffForm.department_id} onChange={(e) => setNewStaffForm({ ...newStaffForm, department_id: e.target.value })} className="edit-input">
                        <option value="iot">IoT</option>
                        <option value="phys">Physics</option>
                    </select>
                    <input type="text" placeholder="Name TH" value={newStaffForm.name_th} onChange={(e) => setNewStaffForm({ ...newStaffForm, name_th: e.target.value })} className="edit-input" required />
                    <input type="text" placeholder="Position" value={newStaffForm.position} onChange={(e) => setNewStaffForm({ ...newStaffForm, position: e.target.value })} className="edit-input" />
                    <input type="email" placeholder="Email" value={newStaffForm.email} onChange={(e) => setNewStaffForm({ ...newStaffForm, email: e.target.value })} className="edit-input" />
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ color: '#aaa', fontSize: '0.8rem' }}>Image:</span>
                        <input type="file" accept="image/*" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], (url) => setNewStaffForm({ ...newStaffForm, image: url }))} />
                    </div>
                    <input type="number" placeholder="Sort" value={newStaffForm.sort_order} onChange={(e) => setNewStaffForm({ ...newStaffForm, sort_order: Number(e.target.value) })} className="edit-input" style={{ width: '80px' }} />
                    <button type="submit" className="btn-save" style={{ padding: '0 20px' }}>Add Staff</button>
                    <div style={{ width: '100%', display: 'flex', gap: '1rem' }}>
                        <input placeholder="Edu History (JSON)" value={newStaffForm.education_history} onChange={(e) => setNewStaffForm({ ...newStaffForm, education_history: e.target.value })} className="edit-input" style={{ flex: 1 }} />
                        <input placeholder="Expertise (JSON)" value={newStaffForm.expertise} onChange={(e) => setNewStaffForm({ ...newStaffForm, expertise: e.target.value })} className="edit-input" style={{ flex: 1 }} />
                    </div>
                </form>
                <table className="admin-table">
                    <thead><tr><th>ID</th><th>Dept</th><th>Name</th><th>Email</th><th>Actions</th></tr></thead>
                    <tbody>
                        {staff.map(s => (
                            <tr key={s.id}>
                                {editingStaffId === s.id ? (
                                    <td colSpan={5}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', background: '#333', padding: '1rem', borderRadius: '4px' }}>
                                            <select value={editStaffFormData.department_id} onChange={(e) => setEditStaffFormData({ ...editStaffFormData, department_id: e.target.value })} className="edit-input">
                                                <option value="iot">IoT</option>
                                                <option value="phys">Physics</option>
                                            </select>
                                            <input value={editStaffFormData.name_th} onChange={(e) => setEditStaffFormData({ ...editStaffFormData, name_th: e.target.value })} className="edit-input" placeholder="Name" />
                                            <input value={editStaffFormData.position} onChange={(e) => setEditStaffFormData({ ...editStaffFormData, position: e.target.value })} className="edit-input" placeholder="Position" />
                                            <input value={editStaffFormData.email} onChange={(e) => setEditStaffFormData({ ...editStaffFormData, email: e.target.value })} className="edit-input" placeholder="Email" />
                                            <input type="number" value={editStaffFormData.sort_order} onChange={(e) => setEditStaffFormData({ ...editStaffFormData, sort_order: Number(e.target.value) })} className="edit-input" style={{ width: '70px' }} />
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <input type="file" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], (url) => setEditStaffFormData({ ...editStaffFormData, image: url }))} />
                                            </div>
                                            <div style={{ width: '100%', display: 'flex', gap: '0.5rem' }}>
                                                <input value={JSON.stringify(editStaffFormData.education_history)} onChange={(e) => setEditStaffFormData({ ...editStaffFormData, education_history: e.target.value })} className="edit-input" style={{ flex: 1 }} />
                                                <input value={JSON.stringify(editStaffFormData.expertise)} onChange={(e) => setEditStaffFormData({ ...editStaffFormData, expertise: e.target.value })} className="edit-input" style={{ flex: 1 }} />
                                            </div>
                                            <button onClick={() => handleStaffSaveClick(s.id)} className="btn-save">Save</button>
                                            <button onClick={() => setEditingStaffId(null)} className="btn-cancel">Cancel</button>
                                        </div>
                                    </td>
                                ) : (
                                    <>
                                        <td>{s.id}</td>
                                        <td>{s.department_id}</td>
                                        <td>{s.name_th}</td>
                                        <td>{s.email}</td>
                                        <td>
                                            <button onClick={() => handleStaffEditClick(s)} className="btn-edit">Edit</button>
                                            <button onClick={() => handleStaffDeleteClick(s.id)} className="btn-cancel">Del</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- CURRICULUM --- */}
            <div className="admin-table-wrapper" style={{ marginBottom: '3rem' }}>
                <h2 className="admin-title" style={{ fontSize: '1.5rem' }}>Curriculum ({currProgram.toUpperCase()} - {currSelectedYear})</h2>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <select value={currProgram} onChange={(e) => setCurrProgram(e.target.value)} className="dept-select">
                        <option value="iot">IoT</option><option value="physiot">PhysIoT</option><option value="continue">Continuing</option>
                    </select>
                    <select value={currSelectedYear} onChange={(e) => setCurrSelectedYear(e.target.value)} className="dept-select">
                        {currYears.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <button onClick={handleSaveCurrMetadata} className="btn-save" disabled={isSavingCurr}>Save PDF Meta</button>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <input placeholder="PDF URL" value={currMetadata.pdfUrl} onChange={(e) => setCurrMetadata({ ...currMetadata, pdfUrl: e.target.value })} className="edit-input" style={{ flex: 2 }} />
                    <input placeholder="PDF Label" value={currMetadata.pdfLabel} onChange={(e) => setCurrMetadata({ ...currMetadata, pdfLabel: e.target.value })} className="edit-input" style={{ flex: 1 }} />
                </div>

                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Courses</h3>
                <form onSubmit={handleNewCourseSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1rem', background: '#333', padding: '1rem', borderRadius: '8px' }}>
                    <input placeholder="ID" value={newCourseForm.id} onChange={(e) => setNewCourseForm({ ...newCourseForm, id: e.target.value })} className="edit-input" required />
                    <input placeholder="Name" value={newCourseForm.name} onChange={(e) => setNewCourseForm({ ...newCourseForm, name: e.target.value })} className="edit-input" required />
                    <input placeholder="Desc" value={newCourseForm.description} onChange={(e) => setNewCourseForm({ ...newCourseForm, description: e.target.value })} className="edit-input" />
                    <input placeholder="Class (optional)" value={newCourseForm.class_name} onChange={(e) => setNewCourseForm({ ...newCourseForm, class_name: e.target.value })} className="edit-input" />

                    <div style={{ display: 'flex', gap: '0.4rem', borderLeft: '1px solid #555', paddingLeft: '0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem', color: '#aaa', marginBottom: '2px' }}>Semester</span>
                            <input type="number" value={newCourseForm.col} onChange={(e) => setNewCourseForm({ ...newCourseForm, col: Number(e.target.value) })} className="edit-input" style={{ width: '45px', padding: '5px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem', color: '#aaa', marginBottom: '2px' }}>Order</span>
                            <input type="number" value={newCourseForm.row} onChange={(e) => setNewCourseForm({ ...newCourseForm, row: Number(e.target.value) })} className="edit-input" style={{ width: '45px', padding: '5px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem', color: '#aaa', marginBottom: '2px' }}>Span</span>
                            <input type="number" value={newCourseForm.row_span} onChange={(e) => setNewCourseForm({ ...newCourseForm, row_span: Number(e.target.value) })} className="edit-input" style={{ width: '45px', padding: '5px' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.3rem', borderLeft: '1px solid #555', paddingLeft: '0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.6rem', color: '#6366f1', marginBottom: '2px' }}>mC</span>
                            <input type="number" value={newCourseForm.mobile_col} onChange={(e) => setNewCourseForm({ ...newCourseForm, mobile_col: Number(e.target.value) })} className="edit-input" style={{ width: '38px', padding: '5px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.6rem', color: '#6366f1', marginBottom: '2px' }}>mR</span>
                            <input type="number" value={newCourseForm.mobile_row} onChange={(e) => setNewCourseForm({ ...newCourseForm, mobile_row: Number(e.target.value) })} className="edit-input" style={{ width: '38px', padding: '5px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.6rem', color: '#6366f1', marginBottom: '2px' }}>mCS</span>
                            <input type="number" value={newCourseForm.mobile_col_span} onChange={(e) => setNewCourseForm({ ...newCourseForm, mobile_col_span: Number(e.target.value) })} className="edit-input" style={{ width: '38px', padding: '5px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.6rem', color: '#6366f1', marginBottom: '2px' }}>mRS</span>
                            <input type="number" value={newCourseForm.mobile_row_span} onChange={(e) => setNewCourseForm({ ...newCourseForm, mobile_row_span: Number(e.target.value) })} className="edit-input" style={{ width: '38px', padding: '5px' }} />
                        </div>
                    </div>

                    <input type="number" placeholder="Group" value={newCourseForm.plan_group} onChange={(e) => setNewCourseForm({ ...newCourseForm, plan_group: e.target.value })} className="edit-input" />
                    <input placeholder="Plan Label" value={newCourseForm.plan_label} onChange={(e) => setNewCourseForm({ ...newCourseForm, plan_label: e.target.value })} className="edit-input" />

                    <button type="submit" className="btn-save">Add Course</button>
                </form>

                <table className="admin-table">
                    <thead><tr><th>ID</th><th>Name</th><th>Col</th><th>Row</th><th>Actions</th></tr></thead>
                    <tbody>
                        {currCourses.map(c => (
                            <tr key={c.id}>
                                {editingCourseId === c.id ? (
                                    <td colSpan={3}>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: '#444', padding: '1rem' }}>
                                            <input value={editCourseForm.name} onChange={(e) => setEditCourseForm({ ...editCourseForm, name: e.target.value })} className="edit-input" placeholder="Name" />
                                            <input value={editCourseForm.description || ''} onChange={(e) => setEditCourseForm({ ...editCourseForm, description: e.target.value })} className="edit-input" placeholder="Desc" />
                                            <input value={editCourseForm.className || ''} onChange={(e) => setEditCourseForm({ ...editCourseForm, className: e.target.value })} className="edit-input" placeholder="Class" />

                                            <div style={{ display: 'flex', gap: '0.4rem', gridColumn: 'span 3', borderTop: '1px solid #555', paddingTop: '0.5rem' }}>
                                                <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
                                                    <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 'bold' }}>Grid:</span>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.6rem', color: '#aaa' }}>Semester</span>
                                                        <input type="number" value={editCourseForm.col} onChange={(e) => setEditCourseForm({ ...editCourseForm, col: Number(e.target.value) })} className="edit-input" style={{ width: '45px', padding: '4px' }} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.6rem', color: '#aaa' }}>Order</span>
                                                        <input type="number" value={editCourseForm.row} onChange={(e) => setEditCourseForm({ ...editCourseForm, row: Number(e.target.value) })} className="edit-input" style={{ width: '45px', padding: '4px' }} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.6rem', color: '#aaa' }}></span>
                                                        <input type="number" value={editCourseForm.rowSpan || 1} onChange={(e) => setEditCourseForm({ ...editCourseForm, rowSpan: Number(e.target.value) })} className="edit-input" style={{ width: '45px', padding: '4px' }} />
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center', marginLeft: '1rem' }}>
                                                    <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 'bold' }}>Mob:</span>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.6rem', color: '#6366f1' }}>Col</span>
                                                        <input type="number" value={editCourseForm.mobileCol} onChange={(e) => setEditCourseForm({ ...editCourseForm, mobileCol: Number(e.target.value) })} className="edit-input" style={{ width: '38px', padding: '4px' }} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.6rem', color: '#6366f1' }}>Row</span>
                                                        <input type="number" value={editCourseForm.mobileRow} onChange={(e) => setEditCourseForm({ ...editCourseForm, mobileRow: Number(e.target.value) })} className="edit-input" style={{ width: '38px', padding: '4px' }} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.6rem', color: '#6366f1' }}>CS</span>
                                                        <input type="number" value={editCourseForm.mobileColSpan || 1} onChange={(e) => setEditCourseForm({ ...editCourseForm, mobileColSpan: Number(e.target.value) })} className="edit-input" style={{ width: '38px', padding: '4px' }} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.6rem', color: '#6366f1' }}>RS</span>
                                                        <input type="number" value={editCourseForm.mobileRowSpan || 1} onChange={(e) => setEditCourseForm({ ...editCourseForm, mobileRowSpan: Number(e.target.value) })} className="edit-input" style={{ width: '38px', padding: '4px' }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '0.2rem' }}>
                                                <input value={editCourseForm.planGroup || ''} onChange={(e) => setEditCourseForm({ ...editCourseForm, planGroup: e.target.value })} className="edit-input" style={{ width: '60px' }} placeholder="Grp" />
                                                <input value={editCourseForm.planLabel || ''} onChange={(e) => setEditCourseForm({ ...editCourseForm, planLabel: e.target.value })} className="edit-input" placeholder="Plan Label" />
                                            </div>

                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button onClick={() => handleCourseSaveClick(c.id)} className="btn-save">Save</button>
                                                <button onClick={() => setEditingCourseId(null)} className="btn-cancel">Cancel</button>
                                            </div>
                                        </div>
                                    </td>
                                ) : (
                                    <>
                                        <td>{c.id}</td>
                                        <td>{c.name}</td>
                                        <td>{c.col}</td>
                                        <td>{c.row}</td>
                                        <td>
                                            <button onClick={() => handleCourseEditClick(c)} className="btn-edit">E</button>
                                            <button onClick={() => handleCourseDeleteClick(c.id)} className="btn-cancel">X</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- DATES --- */}
            <div className="admin-table-wrapper">
                <h2 className="admin-title" style={{ fontSize: '1.5rem' }}>Dates</h2>
                <form onSubmit={handleNewDateSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <input type="date" value={newDateForm.date} onChange={(e) => setNewDateForm({ ...newDateForm, date: e.target.value })} className="edit-input" required />
                    <input type="text" placeholder="Event" value={newDateForm.event_text} onChange={(e) => setNewDateForm({ ...newDateForm, event_text: e.target.value })} className="edit-input" style={{ flex: 1 }} required />
                    <button type="submit" className="btn-save">Add</button>
                </form>
                <table className="admin-table">
                    <tbody>{dates.map(d => (<tr key={d.id}><td>{d.date}</td><td>{d.event_text}</td><td><button onClick={() => handleDateDeleteClick(d.id)} className="btn-cancel">X</button></td></tr>))}</tbody>
                </table>
            </div>
        </div>
    );
}