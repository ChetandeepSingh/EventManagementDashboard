import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import prisma from './prisma.js'
import userRoutes from './routes/user.routes.js';
import eventRoutes from './routes/event.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // logging middleware, logs HTTP requests 
app.use(helmet({
    contentSecurityPolicy: false, // disable content security policy for simplicity for development
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

// Checking the db connection
async function checkDbConnection() {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process if the database connection fails
    }
}
checkDbConnection();

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})