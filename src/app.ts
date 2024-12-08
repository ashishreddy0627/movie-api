import express from 'express';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes';
import { errorHandler } from './middlewares/errorHandler';
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());




// Routes
app.use('/api', movieRoutes);

app.use(errorHandler);
// Default root route
app.get('/', (req, res) => {
    res.send('Welcome to the Movie API!');
});

export default app;
