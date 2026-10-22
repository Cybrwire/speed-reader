import express from 'express';
import { pool } from '../../db/db.js';

export const healthCheck = async (req: express.Request, res: express.Response) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'ok' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Database is unreachable" });
    }
}