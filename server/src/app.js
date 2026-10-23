import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.route.js';

const app = express();

app.use(helmet());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("<h1>Server is Live</h1>");
})

app.use("/api/auth",authRouter);
app.use("/api/message", messageRouter);

export default app;