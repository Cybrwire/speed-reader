import express from 'express';
import type { Application, Request, Response } from 'express';
import authRoutes from './routes/auth.routes.js';
import parseRoutes from './routes/parse.routes.js';
import healthRoutes from './routes/health.routes.js';

const PORT = 3000;
const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', parseRoutes);
app.use('/', healthRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})