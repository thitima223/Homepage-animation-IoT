const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 📂 Multer Set up for Image Uploads
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

// 🔗 MySQL Connection
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "st67050066_iot_website",
//     password: "TvQa6dZKVCEAtd8s75F9",
//     database: "st67050066_iot_website"
// });

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

// 📥 GET: Single professor or staff
const getSingleProfessor = (req, res) => {
    const { id } = req.params;

    // First try professors table
    db.query("SELECT * FROM professors WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            const professor = {
                ...results[0],
                education_history: safeJsonParse(results[0].education_history),
                expertise: safeJsonParse(results[0].expertise),
                research: safeJsonParse(results[0].research),
                isHead: Boolean(results[0].is_head),
                is_head: Boolean(results[0].is_head)
            };
            return res.json(professor);
        }

        // If not found in professors, try staff table
        db.query("SELECT * FROM staff WHERE id = ?", [id], (err, staffResults) => {
            if (err) return res.status(500).json({ error: err.message });
            if (staffResults.length === 0) return res.status(404).json({ error: "Member not found" });

            const staffMember = {
                ...staffResults[0],
                education_history: safeJsonParse(staffResults[0].education_history),
                expertise: safeJsonParse(staffResults[0].expertise),
                research: [], // Staff usually don't have research column in schema
                isHead: false,
                is_head: false
            };
            res.json(staffMember);
        });
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
app.post("/api/professors", createProfessor);

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

// ------------------- STAFF ENDPOINTS -------------------

// 📥 GET: All staff
const getStaff = (req, res) => {
    const { department } = req.query;
    let sql = "SELECT * FROM staff";
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
            research: safeJsonParse(row.research || '[]')
        }));

        res.json(data);
    });
};

app.get("/api/staff", getStaff);
app.get("/staff", getStaff);

// 📤 PUT: Update staff
app.put("/api/staff/:id", (req, res) => {
    const { id } = req.params;
    const {
        department_id, name_th, position, image, email,
        education_history, expertise, sort_order
    } = req.body;

    const sql = `
        UPDATE staff
        SET department_id = ?, name_th = ?, position = ?, image = ?, email = ?,
            education_history = ?, expertise = ?, sort_order = ?
        WHERE id = ?
    `;

    const values = [
        department_id, name_th, position, image, email,
        formatJson(education_history), formatJson(expertise), sort_order, id
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Staff updated successfully" });
    });
});

// ➕ POST: Create staff
app.post("/api/staff", (req, res) => {
    const {
        id, department_id, name_th, position, image, email,
        education_history, expertise, sort_order
    } = req.body;

    const sql = `
        INSERT INTO staff
        (id, department_id, name_th, position, image, email,
         education_history, expertise, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        id, department_id, name_th, position, image, email,
        formatJson(education_history || []),
        formatJson(expertise || []),
        sort_order || 0
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Staff created successfully" });
    });
});

// 🗑️ DELETE: Delete staff
app.delete("/api/staff/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM staff WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Staff deleted successfully" });
    });
});

// ------------------- END STAFF -------------------

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

// 📚 GET: Curriculum Metadata (PDF, etc.)
app.get("/api/curriculum/:program/:year/metadata", (req, res) => {
    const { program, year } = req.params;
    const sql = "SELECT * FROM curriculum_metadata WHERE program = ? AND curriculum_year = ?";
    db.query(sql, [program, year], (err, results) => {
        if (err) {
            console.error("❌ Metadata Query Error:", err);
            return res.status(500).json({ error: err.message });
        }
        if (results[0]) {
            res.json({
                program: results[0].program,
                curriculumYear: results[0].curriculum_year,
                pdfUrl: results[0].pdf_url,
                pdfLabel: results[0].pdf_label
            });
        } else {
            res.json({ program, curriculumYear: year, pdfUrl: "", pdfLabel: "" });
        }
    });
});

// 📚 PUT: Update Curriculum Metadata
app.put("/api/curriculum/metadata", (req, res) => {
    const { program, curriculumYear, pdfUrl, pdfLabel } = req.body;
    const sql = `
        INSERT INTO curriculum_metadata (program, curriculum_year, pdf_url, pdf_label)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE pdf_url = VALUES(pdf_url), pdf_label = VALUES(pdf_label)
    `;
    db.query(sql, [program, curriculumYear, pdfUrl, pdfLabel], (err, result) => {
        if (err) {
            console.error("❌ Metadata Update Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Metadata updated successfully" });
    });
});

// 📚 PUT: Update Course
app.put("/api/curriculum/:program/:year/courses/:id", (req, res) => {
    const { program, year, id } = req.params;
    const {
        name, description, col, row, row_span, class_name,
        mobile_col, mobile_row, mobile_col_span, mobile_row_span, plan_group, plan_label
    } = req.body;

    const tableMap = {
        'iot': 'curriculum_iot',
        'physiot': 'curriculum_physiot',
        'continue': 'curriculum_continue'
    };
    const tableName = tableMap[program];
    if (!tableName) return res.status(400).json({ error: "Invalid program" });

    const sql = `
        UPDATE ${tableName}
        SET name = ?, description = ?, \`col\` = ?, \`row\` = ?, row_span = ?,
            class_name = ?, mobile_col = ?, mobile_row = ?, mobile_col_span = ?, mobile_row_span = ?, plan_group = ?, plan_label = ?
        WHERE id = ? AND curriculum_year = ?
    `;

    db.query(sql, [
        name, description, col, row, row_span, class_name,
        mobile_col, mobile_row, mobile_col_span, mobile_row_span, plan_group, plan_label, id, year
    ], (err, result) => {
        if (err) {
            console.error("❌ Course Update Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Course updated successfully" });
    });
});
// 📚 GET: Available Years for a Program
app.get("/api/curriculum/:program/years", (req, res) => {
    const { program } = req.params;
    const tableMap = {
        'iot': 'curriculum_iot',
        'physiot': 'curriculum_physiot',
        'continue': 'curriculum_continue'
    };
    const tableName = tableMap[program];
    if (!tableName) {
        return res.status(400).json({ error: "Invalid program name" });
    }
    const sql = `SELECT DISTINCT curriculum_year FROM ${tableName} ORDER BY curriculum_year DESC`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Years Query Error:", err);
            return res.status(500).json({ error: err.message });
        }
        const years = results.map(r => r.curriculum_year);
        console.log(`📅 Available years for ${program}:`, years);
        res.json(years);
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
            mobileRowSpan: row.mobile_row_span,
            planGroup: row.plan_group ?? null,
            planLabel: row.plan_label ?? null,
        }));

        res.json(data);
    });
});

// 📚 POST: Add New Course
app.post("/api/curriculum/:program/:year/courses", (req, res) => {
    const { program, year } = req.params;
    const {
        id, name, description, col, row, row_span, class_name,
        mobile_col, mobile_row, mobile_col_span, mobile_row_span, plan_group, plan_label
    } = req.body;

    const tableMap = {
        'iot': 'curriculum_iot',
        'physiot': 'curriculum_physiot',
        'continue': 'curriculum_continue'
    };
    const tableName = tableMap[program];
    if (!tableName) return res.status(400).json({ error: "Invalid program" });

    const sql = `
        INSERT INTO ${tableName}
        (id, curriculum_year, name, description, \`col\`, \`row\`, row_span, class_name, mobile_col, mobile_row, mobile_col_span, mobile_row_span, plan_group, plan_label)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        id, year, name, description, col || 1, row || 1, row_span || 1, class_name || null,
        mobile_col || col || 1, mobile_row || row || 1, mobile_col_span || 1, mobile_row_span || 1, plan_group || null, plan_label || null
    ], (err, result) => {
        if (err) {
            console.error("❌ Course Insertion Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Course added successfully" });
    });
});

// 📚 DELETE: Remove Course
app.delete("/api/curriculum/:program/:year/courses/:id", (req, res) => {
    const { program, year, id } = req.params;
    const tableMap = {
        'iot': 'curriculum_iot',
        'physiot': 'curriculum_physiot',
        'continue': 'curriculum_continue'
    };
    const tableName = tableMap[program];
    if (!tableName) return res.status(400).json({ error: "Invalid program" });

    const sql = `DELETE FROM ${tableName} WHERE id = ? AND curriculum_year = ?`;
    db.query(sql, [id, year], (err, result) => {
        if (err) {
            console.error("❌ Course Delete Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Course deleted successfully" });
    });
});

// 🚀 Start Server
// 1. สั่งให้ Express ให้บริการไฟล์ Static จากโฟลเดอร์ dist (ไฟล์หน้าเว็บ React)
app.use(express.static(path.join(__dirname, "dist")));

// 2. Catch-all Route: ถ้าผู้ใช้เข้า URL อื่นๆ ที่ไม่ใช่ API ให้ส่งไฟล์ index.html ของ React ไปให้
// (สิ่งนี้จำเป็นมาก เพื่อให้ React Router เปลี่ยนหน้าเว็บได้โดยไม่ติด Error 404)
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ==========================================

// 🚀 Start Server
// (คุณสามารถเปลี่ยนเลข 3001 เป็น 7300 ได้เลยถ้าต้องการล็อคพอร์ตไว้ในโค้ด)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});