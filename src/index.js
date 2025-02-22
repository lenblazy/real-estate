import "dotenv/config"
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import adRoutes from './routes/ad.js';

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: "Invalid JSON format" });
    }
    next();
});

// connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected');
        // routes middlewares
        app.use("/api/v1", authRoutes);
        app.use("/api/v1", adRoutes);

        app.listen(3000, () => console.log("Server is running on port 3000"));
    })
    .catch((err) => console.log(`DB connection failed: ${err}`));



