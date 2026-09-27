import express from 'express';
import type { Application, Request, Response } from 'express';
import authRoutes from './routes/auth.routes.js';
import { healthCheck, parseJpInput } from './routes/server.routes.js';

const PORT = 3000;
const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', authRoutes);

app.post('/api/parse', parseJpInput)

app.get('/health', healthCheck)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})