import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findByEmail, create } from "../models/User.js";

export const registerUser = async (req, res) => {
    const { name, email, password} = req.body;

    if (!name || !email || !password) 
        return res.status(400).json({ message: "Missing fields" });

    try {
        const existing = await findByEmail(email);
        if (existing) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await create({ name, email, password:hash });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h"}
        );

        res.json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Missing fields" });

    try {
        const userRow = await findByEmail(email);
        if(!userRow) return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, userRow.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const user = {
            id: userRow.id,
            name: userRow.name,
            email: userRow.email,
            role: userRow.role,
        };

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h"}
        );

        res.json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};