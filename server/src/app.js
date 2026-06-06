import express from 'express';
import authRoutes from './routes/auth.routes.js'

const app = express();

app.use(express.json()); // to parse incomn=ing requests with json payloads (From req.body)

app.use('/api/auth/v1',authRoutes);

export default app;