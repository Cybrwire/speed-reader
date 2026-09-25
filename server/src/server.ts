import express from 'express';
import type { Application, Request, Response } from 'express';
import { parseWithIchiran } from './ichiran.js';
import { pool } from './db.js';
import authRoutes from './routes/auth.routes.js';

const PORT = 3000;
const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', authRoutes);

app.post('/api/parse', async (req: express.Request, res: express.Response) => {
    const { sentence } = req.body;

    if (!sentence || typeof sentence !== 'string') {
        res.status(400).json({ error: 'Input must be a string and must not be empty' });
        return;
    }

    try {
        const result = await parseWithIchiran(sentence);
        res.json({ tokens: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to parse sentence'});
    }
})

app.get('/health',async (req: express.Request, res: express.Response) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'ok' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Database is unreachable" });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})