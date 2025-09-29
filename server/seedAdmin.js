import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { findByEmail, create } from "./models/User.js";

dotenv.config

const seedAdmin = async () => {
    try {
        const { ADMIN_EMAIL, ADMIN_PASS, ADMIN_NAME } = process.env;

        // Check if admin already exists
        const existing = await findByEmail(ADMIN_EMAIL);

        if(existing) {
            console.log("Admin already exists:", existing.email);
            process.exit(0);
        }

        // hash password
        const hash = await bcrypt.hash(ADMIN_PASS, 10);

        // Create Admin
        const admin = await create({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            passwordHash: hash,
            role: "admin",
        });

        console.log("Admin user created:", admin.email);
        process.exit(0);
    } catch (err) {
        console.error("Error seeding admin:", err);
        process.exit(1);
    }
};

seedAdmin();