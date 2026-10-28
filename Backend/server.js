
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const formRoutes = require("./routes/FormRoutes");
const submissionRoutes = require("./routes/SubmissionRoutes");
const authRoutes = require("./routes/AuthRoutes")

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL
    ].filter(Boolean)
  })
);
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/submissions", submissionRoutes);

app.get("/", (req, res) => {
  res.json({ message: "FormCraft backend is running!" });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Atlas connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
