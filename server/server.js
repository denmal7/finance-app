import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import  db  from "./config/db.js";
import authRoutes from "./routes/auth.js";
import protectedRoutes from "./routes/protected.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())


// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/transactions", transactionRoutes);

let connection;

const startServer = async () => {
    try {
        const connection = await db.getConnection();
        console.log("Successfully connected to database");
    } catch (err)  {
        console.error('Error connecting to the database:', err);
    } finally {
        if (connection) {
            connection.release();
        }
    }

    const PORT = process.env.PORT || 8840;
    app.listen(PORT, () => {
        console.log("Server running...");
    })
};

startServer();
