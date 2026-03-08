const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pern06006^_^",
    database: "iotwebsite"
});

db.connect(err => {
    if (err) {
        console.error("❌ MySQL Connection Error:", err);
        return;
    }
    console.log("✅ MySQL Connected");
});

// Helper Function: Safe JSON parse
function safeJsonParse(str) {
    if (!str) return [];
    if (typeof str === 'object') return str;
    try {
        return JSON.parse(str);
    } catch (e) {
        console.warn("⚠️ JSON parse failed:", e);
        return [];
    }
}

// Helper Function: Format for MySQL JSON
function formatJson(data) {
    if (data === null || data === undefined) return null;
    if (typeof data === 'string') {
        try {
            JSON.parse(data);
            return data;
        } catch {
            return JSON.stringify(data);
        }
    }
    return JSON.stringify(data);
}

// 📥 GET: All professors (with optional department filter)
// Supports both /professors and /api/professors
const getProfessors = (req, res) => {
    const { department } = req.query;
    let sql = "SELECT * FROM professors";
    const values = [];

    if (department) {
        sql += " WHERE department_id = ?";
        values.push(department);
    }

    sql += " ORDER BY department_id, sort_order, name_th";

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ error: err.message });
        }

        const data = results.map(row => ({
            ...row,
            education_history: safeJsonParse(row.education_history),
            expertise: safeJsonParse(row.expertise),
            research: safeJsonParse(row.research),
            isHead: Boolean(row.is_head),
            is_head: Boolean(row.is_head)
        }));

        res.json(data);
    });
};

app.get("/professors", getProfessors);
app.get("/api/professors", getProfessors);

// 📥 GET: Single professor
const getSingleProfessor = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM professors WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Professor not found" });

        const professor = {
            ...results[0],
            education_history: safeJsonParse(results[0].education_history),
            expertise: safeJsonParse(results[0].expertise),
            research: safeJsonParse(results[0].research),
            isHead: Boolean(results[0].is_head),
            is_head: Boolean(results[0].is_head)
        };
        res.json(professor);
    });
};

app.get("/professors/:id", getSingleProfessor);
app.get("/api/professors/:id", getSingleProfessor);

// 📤 PUT: Update professor
const updateProfessor = (req, res) => {
    const { id } = req.params;
    const {
        department_id, name_th, position, image, email,
        is_head, education_history, expertise, research, sort_order
    } = req.body;

    const sql = `
        UPDATE professors 
        SET department_id = ?, name_th = ?, position = ?, image = ?, email = ?, 
            is_head = ?, education_history = ?, expertise = ?, research = ?, sort_order = ?
        WHERE id = ?
    `;

    const values = [
        department_id,
        name_th,
        position,
        image,
        email,
        is_head ? 1 : 0,
        formatJson(education_history),
        formatJson(expertise),
        formatJson(research),
        sort_order,
        id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ Update Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Professor updated successfully", affectedRows: result.affectedRows });
    });
};

app.put("/professors/:id", updateProfessor);
app.put("/api/professors/:id", updateProfessor);

// ➕ POST: Create professor
const createProfessor = (req, res) => {
    const {
        id, department_id, name_th, position, image, email,
        is_head, education_history, expertise, research, sort_order
    } = req.body;

    const sql = `
        INSERT INTO professors 
        (id, department_id, name_th, position, image, email, is_head, 
         education_history, expertise, research, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        id, department_id, name_th, position, image, email,
        is_head ? 1 : 0,
        formatJson(education_history || []),
        formatJson(expertise || []),
        formatJson(research || []),
        sort_order || 0
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ Insert Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Professor created successfully", id: result.insertId });
    });
};

app.post("/professors", createProfessor);
app.get("/api/professors", createProfessor);

// 🗑️ DELETE: Delete professor
const deleteProfessor = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM professors WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Professor not found" });
        res.json({ message: "Professor deleted successfully" });
    });
};

app.delete("/professors/:id", deleteProfessor);
app.delete("/api/professors/:id", deleteProfessor);

// 🗓️ GET: All important dates
app.get("/api/important-dates", (req, res) => {
    db.query("SELECT id, DATE_FORMAT(date, '%Y-%m-%d') as date, event_text FROM important_dates ORDER BY date ASC", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 🗓️ POST: Create important date
app.post("/api/important-dates", (req, res) => {
    const { date, event_text } = req.body;
    db.query("INSERT INTO important_dates (date, event_text) VALUES (?, ?)", [date, event_text], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, date, event_text });
    });
});

// 🗓️ PUT: Update important date
app.put("/api/important-dates/:id", (req, res) => {
    const { id } = req.params;
    const { date, event_text } = req.body;
    db.query("UPDATE important_dates SET date = ?, event_text = ? WHERE id = ?", [date, event_text, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Updated successfully" });
    });
});

// 🗓️ DELETE: Delete important date
app.delete("/api/important-dates/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM important_dates WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted successfully" });
    });
});

// 📚 GET: Curriculum Data
app.get("/api/curriculum/:program/:year", (req, res) => {
    const { program, year } = req.params;

    // Map program names to tables
    const tableMap = {
        'iot': 'curriculum_iot',
        'physiot': 'curriculum_physiot',
        'continue': 'curriculum_continue'
    };

    const tableName = tableMap[program];
    if (!tableName) {
        return res.status(400).json({ error: "Invalid program name" });
    }

    const sql = `SELECT * FROM ${tableName} WHERE curriculum_year = ? ORDER BY \`col\`, \`row\``;
    db.query(sql, [year], (err, results) => {
        if (err) {
            console.error("❌ Curriculum Query Error:", err);
            return res.status(500).json({ error: err.message });
        }
        console.log(`📚 Fetched ${results.length} courses for ${program} ${year}`);
        if (results.length > 0) {
            console.log("🔍 Sample row from DB:", JSON.stringify(results[0]));
        }

        // Map DB columns back to frontend camelCase if needed
        const data = results.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
            col: row.col,
            row: row.row,
            rowSpan: row.row_span,
            className: row.class_name,
            mobileCol: row.mobile_col,
            mobileRow: row.mobile_row,
            mobileColSpan: row.mobile_col_span,
            mobileRowSpan: row.mobile_row_span
        }));

        res.json(data);
    });
});

// 🚀 Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});