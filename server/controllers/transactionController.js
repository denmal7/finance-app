import Transaction from "../models/Transaction.js";

// Create new transaction

export const createTransaction = async (req, res) => {
    try {
        const { type, amount, category, note, date } = req.body;

        if (!type || !amount || !category) {
            return res.status(400).json({ message: "Type, amount, and category are required" });
        }

    
        const transaction = await Transaction.create({
            user_id: req.user.id, // from authMiddleware
            type,
            amount,
            category,
            note: note || null,
            date: date || new Date(),
        });

         res.status(201).json(transaction);
        
    } catch (err) {
        console.error("Create transaction error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


// Get all transactions for logged in user
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findByUser(req.user.id);
        res.json(transactions);
    } catch (err) {
        console.error("Fetch transactions error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


// Get single transaction
export const getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id, req.user.id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.json(transaction);
    } catch (err) {
        console.error("Get transaction error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update
export const updateTransaction = async (req, res) => {
    try {
        const updated = await Transaction.update(req.params.id, req.user.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Transaction not found or no fields to update "});
        }
        res.json(updated);
    } catch (err) {
        console.error("Update transaction error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


// DELETE
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id, req.user.id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        await Transaction.delete(req.params.id, req.user.id);
        res.json({ message: "Transaction deleted" });
    } catch (err) {
        console.error("Delete transaction error:", err);
        res.status(500).json({ message: "Server error" });
    }
};