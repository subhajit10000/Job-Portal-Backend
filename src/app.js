const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const app = express();

app.use(cors());

app.use(express.json());

const connectDB = require("./config/db");
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (e) {
        next(e);
    }
});

app.get("/", (req, res) => res.json({ message: "API running" }));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Global error handler — catches every next(error) call from controllers
// and every uncaught error in async routes, and always returns JSON
// (Express's default handler returns HTML, which breaks the frontend's
// err.response?.data?.message reads).
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something went wrong",
    });
});

module.exports = app;
