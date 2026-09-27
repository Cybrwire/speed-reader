import express from 'express';
import { pool } from '../../db/db.js';
import { parseWithIchiran } from '../ichiran.js';

export const healthCheck = async (req: express.Request, res: express.Response) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'ok' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Database is unreachable" });
    }
}

export const parseJpInput = async (req: express.Request, res: express.Response) => { 
    const { sentence } = req.body; 

    if (!sentence || typeof sentence !== 'string') {
        return res.status(400).json({ error: 'Input must be a string and must not be empty' });
    }

    try{
        const result = await parseWithIchiran(sentence);
        return res.json({ tokens: result });
    } catch (error) {
        console.error(error);
        return res.send(500).json({ error: 'Failed to parse text.'});
    }
}

