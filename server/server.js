import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

// Connect DB
connectDB();

// Normal middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("API Working");
});


app.post('/webhooks', clerkWebhooks);
 
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
