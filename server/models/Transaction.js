import db from "../config/db.js";

const Transaction = {
    // Create
    create: async (transaction) => {
        const {user_id, type, amount, category, note, date} = transaction;
        const [result] = await db.execute(
            `INSERT INTO transactions (user_id, type, amount, category, note, date)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [user_id, type, amount, category, note, date]
        );
        return { id: result.insertId, ...transaction};
    },


    // Get all for a user
    findByUser: async (user_id) => {
        const [rows] = await db.execute(
            `SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC`,
            [user_id]
        );
        return rows;
    },

    // Get by id
    findById: async (id, user_id) => {
        const [rows] = await db.execute(
            `SELECT * FROM transactions WHERE id = ? AND user_id = ?`,
            [id, user_id]
        );
        return rows[0];
    },

    // Update
    update: async (id, user_id, updates) => {
        const fields = [];
        const values = [];

        Object.entries(updates).forEach(([key, value]) => {
            fields.push(`${key} = ?`);
            values.push(value);
        });

        if (fields.length === 0) return null;

        values.push(id, user_id);

        await db.execute(
            `UPDATE transaction SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`,
            values
        );

        return Transaction.findById(id, user_id);
    },

    // Delete
    delete: async (id, user_id) => {
        await db.execute(
            `DELETE FROM transactions WHERE id = ? and user_id = ?`,
            [id, user_id]
        );
        return true;
    },
};

export default Transaction;