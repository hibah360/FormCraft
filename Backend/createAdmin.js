
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!email || !password) {
            throw new Error(
                "Please configure ADMIN_EMAIL and ADMIN_PASSWORD in your .env file."
            );
        }

        const existingAdmin = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if (existingAdmin) {
            console.log("Admin account already exists. No changes made.");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({
            email: email.trim().toLowerCase(),
            password: hashedPassword,
        });

        console.log("Admin account created successfully.");
    } catch (error) {
        console.error("Admin setup failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
