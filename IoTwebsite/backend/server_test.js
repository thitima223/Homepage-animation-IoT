const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// 📂 Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 📂 Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

// 🔗 Local MySQL Connection (iotwebsite)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pern06006^_^", // Your local password
    database: "iotwebsite"      // Your local database name
});

db.connect(err => {
    if (err) {
        console.error("❌ MySQL Connection Error:", err);
        return;
    }
    console.log("✅ MySQL Connected (Local: iotwebsite)");
});

// Helper Function: Safe JSON parse
function safeJsonParse(str) {
    if (!str) return [];
    if (typeof str === 'object') return str;
    try { return JSON.parse(str); } catch (e) { return []; }
}

// Helper Function: Format for MySQL JSON
function formatJson(data) {
    if (!data) return '[]';
    if (typeof data === 'string') return data;
    return JSON.stringify(data);
}

// --- PROFESSORS ---
app.get("/professors", (req, res) => {
    const { department } = req.query;
    let sql = "SELECT * FROM professors";
    if (department) sql += " WHERE department_id = ?";
    sql += " ORDER BY department_id, sort_order, name_th";

    db.query(sql, department ? [department] : [], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.map(row => ({
            ...row,
            education_history: safeJsonParse(row.education_history),
            expertise: safeJsonParse(row.expertise),
            research: safeJsonParse(row.research),
            isHead: Boolean(row.is_head)
        })));
    });
});

app.get("/professors/:id", (req, res) => {
    db.query("SELECT * FROM professors WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Not found" });
        res.json({
            ...results[0],
            education_history: safeJsonParse(results[0].education_history),
            expertise: safeJsonParse(results[0].expertise),
            research: safeJsonParse(results[0].research),
            isHead: Boolean(results[0].is_head)
        });
    });
});

app.put("/professors/:id", (req, res) => {
    const { department_id, name_th, position, image, email, is_head, education_history, expertise, research, sort_order } = req.body;
    const sql = `UPDATE professors SET department_id=?, name_th=?, position=?, image=?, email=?, is_head=?, education_history=?, expertise=?, research=?, sort_order=? WHERE id=?`;
    db.query(sql, [department_id, name_th, position, image, email, is_head ? 1 : 0, formatJson(education_history), formatJson(expertise), formatJson(research), sort_order, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Updated" });
    });
});

app.post("/professors", (req, res) => {
    const { id, department_id, name_th, position, image, email, is_head, education_history, expertise, research, sort_order } = req.body;
    const sql = `INSERT INTO professors (id, department_id, name_th, position, image, email, is_head, education_history, expertise, research, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [id, department_id, name_th, position, image, email, is_head ? 1 : 0, formatJson(education_history), formatJson(expertise), formatJson(research), sort_order], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Created" });
    });
});

app.delete("/professors/:id", (req, res) => {
    db.query("DELETE FROM professors WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted" });
    });
});

// --- STAFF ---
app.get("/api/staff", (req, res) => {
    db.query("SELECT * FROM staff ORDER BY sort_order", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.map(row => ({
            ...row,
            education_history: safeJsonParse(row.education_history),
            expertise: safeJsonParse(row.expertise)
        })));
    });
});

// --- DATES ---
app.get("/api/important-dates", (req, res) => {
    db.query("SELECT id, DATE_FORMAT(date, '%Y-%m-%d') as date, event_text FROM important_dates ORDER BY date", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 🚀 Serve React from 'dist'
app.use(express.static(path.join(__dirname, "dist")));
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = 3001; // Test on different port
app.listen(PORT, () => {
    console.log(`🚀 TEST Server running on http://localhost:${PORT}`);
});
