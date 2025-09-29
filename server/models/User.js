import db from "../config/db.js";

export const findByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0]; // return single user or undefined
};

export const findById = async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [id]);
    return rows[0];
};

export const create = async ({ name, email, password, role = "user" }) => {
    const [result] = await db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, password, role] 
    );
    return { id: result.insertId, name, email, role};
};
