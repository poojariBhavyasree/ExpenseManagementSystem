const expenseRoutes = require("./routes/expenseRoutes"); 
const incomeRoutes = require("./routes/incomeRoutes"); 
const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");

require("dotenv").config();

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log("🔥 REQUEST RECEIVED:", req.method, req.originalUrl);
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});