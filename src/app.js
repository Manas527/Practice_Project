import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:8000',
    credentials: true
}
)); 

app.use(express.json({limit: '32kb'}));
app.use(express.urlencoded({extended: true, limit: '32kb'}));
app.use(express.static('public'));
app.use(cookieParser());

// routes import
import userRouter from './routes/user.routes.js';


// routes declaration
app.use('/api/v1/users', userRouter);

export {app};