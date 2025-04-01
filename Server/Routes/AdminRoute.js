import express from "express";
import connection from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure "uploads/" directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Register Admin
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [existingUser] = await connection
      .promise()
      .query("SELECT * FROM admin WHERE email = ?", [email]);

    if (existingUser && existingUser.length > 0) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    await connection
      .promise()
      .query("INSERT INTO admin (email, password) VALUES (?, ?)", [email, hash]);

    res.json({ success: true, message: "Registration successful" });
  } catch (err) {
    res.json({ success: false, message: "Error in registration", error: err.message });
  }
});

// ✅ Admin Login
router.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await connection
      .promise()
      .query("SELECT * FROM admin WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, users[0].password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ role: "admin", email: users[0].email }, "jwt_secret_key", {
      expiresIn: "1d",
    });

    res.cookie("token", token);
    res.json({ success: true, token, message: "Login successful" });
  } catch (err) {
    res.json({ success: false, message: "Login error", error: err.message });
  }
});

// ✅ Get Categories
router.get("/category", async (req, res) => {
  try {
    const [categories] = await connection.promise().query("SELECT * FROM category");
    res.json({ Status: true, Result: categories });
  } catch (err) {
    res.json({ Status: false, Error: "Query Error", error: err.message });
  }
});

// ✅ Add Category
router.post("/add_category", async (req, res) => {
  try {
    await connection.promise().query("INSERT INTO category (name) VALUES (?)", [
      req.body.category,
    ]);
    res.json({ Status: true });
  } catch (err) {
    res.json({ Status: false, Error: "Query Error", error: err.message });
  }
});

// ✅ Add Employee (with file upload)
router.post("/add_employee", upload.single("image"), async (req, res) => {
  const { name, email, password, address, salary, category_id } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const hash = await bcrypt.hash(password, 10);
    await connection
      .promise()
      .query(
        "INSERT INTO employee (name, email, password, address, salary, image, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, email, hash, address, salary, image, category_id]
      );
    res.json({ Status: true, message: "Employee added successfully" });
  } catch (err) {
    res.json({ Status: false, Error: "Database Error", error: err.message });
  }
});

// ✅ Get Employee
router.get("/employee", async (req, res) => {
  try {
    const [employees] = await connection.promise().query("SELECT * FROM employee");
    res.json({ Status: true, Result: employees });
  } catch (err) {
    res.json({ Status: false, Error: "Query Error", error: err.message });
  }
});

// ✅ Get Single Employee
router.get("/employee/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";

    const [result] = await connection.promise().query(sql, [id]);

    if (result.length === 0) {
      return res.json({ Status: false, Error: "Employee not found" });
    }
    return res.json({ Status: true, Result: result[0] }); // Return single employee object
  } catch (err) {
    return res.json({ Status: false, Error: "Query Error", error: err.message });
  }
});

// ✅ Edit Employee
router.put("/edit_employee/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let { name, email, salary, address, category_id, password } = req.body;

    let sql = `
      UPDATE employee 
      SET name = ?, email = ?, salary = ?, address = ?, category_id = ?
      WHERE id = ?
    `;
    let values = [name, email, salary, address, category_id, id];

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      sql = `
        UPDATE employee 
        SET name = ?, email = ?, salary = ?, address = ?, category_id = ?, password = ?
        WHERE id = ?
      `;
      values = [name, email, salary, address, category_id, hash, id];
    }

    const [result] = await connection.promise().query(sql, values);

    if (result.affectedRows === 0) {
      return res.json({ Status: false, Error: "Employee not found or no changes made" });
    }

    return res.json({ Status: true, Message: "Employee updated successfully" });
  } catch (err) {
    return res.json({ Status: false, Error: "Query Error", error: err.message });
  }
});

// ✅ Delete Employee
router.delete('/delete_employee/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const sql = "DELETE FROM employee WHERE id = ?";
      
      const [result] = await connection.promise().query(sql, [id]);

      if (result.affectedRows === 0) {
          return res.json({ Status: false, Error: "Employee not found" });
      }

      return res.json({ Status: true, Message: "Employee deleted successfully" });
  } catch (err) {
      return res.json({ Status: false, Error: "Query Error", error: err.message });
  }
});

// ✅ Admin Count API
router.get("/admin_count", async (req, res) => {
  try {
    const [rows] = await connection.promise().query("SELECT COUNT(*) AS admin FROM admin");
    res.json({ Status: true, Result: rows });
  } catch (error) {
    res.json({ Status: false, Error: error.message });
  }
});

// ✅ Employee Count API
router.get("/employee_count", async (req, res) => {
  try {
    const [rows] = await connection.promise().query("SELECT COUNT(*) AS employee FROM employee");
    res.json({ Status: true, Result: rows });
  } catch (error) {
    res.json({ Status: false, Error: error.message });
  }
});

// ✅ Salary Count API
router.get("/salary_count", async (req, res) => {
  try {
    const [rows] = await connection.promise().query("SELECT SUM(salary) AS salaryOFEmp FROM employee");
    res.json({ Status: true, Result: rows });
  } catch (error) {
    res.json({ Status: false, Error: error.message });
  }
});


router.get('/admin_records', async (req, res) => {
  try {
      const [result] = await connection.promise().query("SELECT * FROM admin");

      if (result.length === 0) {
          return res.json({ Status: false, Error: "No admin records found" });
      }
      return res.json({ Status: true, Result: result });
  } catch (err) {
      console.error("Query Error:", err);
      return res.status(500).json({ Status: false, Error: "Query Error: " + err.message });
  }
});


router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})


export { router as adminRouter };
