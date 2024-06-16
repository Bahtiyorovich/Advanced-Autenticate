import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware.js';
import "./configs/database.js";
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser({}));
app.use(express.static('static'))
// Routes
app.use('/api/auth', authRoutes);


// error middelware
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})