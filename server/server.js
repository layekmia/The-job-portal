import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import jobsRoute from './routes/jobRoutes.js';
import userRoutes from './routes/userRoute.js'

const app = express();

// Connect DB
await connectDB();
await connectCloudinary();

// CORS Middleware
app.use(cors());

// JSON middleware for all routes except /webhooks
app.use(express.json());


// Routes
app.get('/', (req, res) => {
    res.send("API Working so good");
});

// Webhook route must come BEFORE express.json and must use raw body parser
app.post('/webhooks',  clerkWebhooks);


app.use('/api/company', companyRoutes);

// it will be public api we don't need any token
app.use('/api/jobs', jobsRoute ); 

// user routes;
app.use("/api/users", userRoutes)


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
