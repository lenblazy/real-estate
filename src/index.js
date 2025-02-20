import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import "dotenv/config"

const app = express();

// connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(`DB connection failed: ${err}`) );

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/v1', (req, res) => {
    res.send(`The current time is ${new Date().toLocaleTimeString()}`);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})