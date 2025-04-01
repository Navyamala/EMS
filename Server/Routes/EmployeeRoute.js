import express from 'express';
import connection from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// Employee Login
router.post("/employee_login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ loginStatus: false, Error: "Email and password are required" });
    }

    const sql = "SELECT * FROM employee WHERE email = ?";
    connection.query(sql, [email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Database error" });

        if (result.length === 0) {
            return res.json({ loginStatus: false, Error: "Invalid email or password" });
        }

        bcrypt.compare(password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Error verifying password" });
            if (!response) return res.json({ loginStatus: false, Error: "Invalid email or password" });

            const token = jwt.sign(
                { role: "employee", email: result[0].email, id: result[0].id },
                "jwt_secret_key",
                { expiresIn: "1d" }
            );

            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
            return res.json({ loginStatus: true, id: result[0].id });
        });
    });
});

// Get Employee Details
router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    
    connection.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Database query error" });
        if (result.length === 0) return res.json({ Status: false, Error: "Employee not found" });

        return res.json({ Status: true, data: result[0] });
    });
});

// Employee Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    return res.json({ Status: true, Message: "Logged out successfully" });
});

export { router as EmployeeRouter };
