import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

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