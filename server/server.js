import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

// Connect DB
connectDB();

// CORS Middleware
app.use(cors());

// JSON middleware for all routes except /webhooks
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("API Working");
});

// Webhook route must come BEFORE express.json and must use raw body parser
app.post('/webhooks', bodyParser.raw({ type: 'application/json' }), clerkWebhooks);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
