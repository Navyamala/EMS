import express from "express";
import cors from "cors";
import { adminRouter } from "../Server/Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

// ✅ Proper CORS Setup
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Set Headers Manually
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/auth", adminRouter);
app.use("/employee", EmployeeRouter);

// ✅ Serve the `uploads` folder correctly
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ JWT Authentication Middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ Status: false, Error: "Unauthorized: No Token Provided" });
    }

    Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if (err) {
            return res.json({ Status: false, Error: "Unauthorized: Invalid Token" });
        }

        req.role = decoded.role;
        req.id = decoded.id;
        next();
    });
};

// ✅ Route to Verify User
app.get("/verify", verifyUser, (req, res) => {
    return res.json({ Status: true, role: req.role, id: req.id });
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});