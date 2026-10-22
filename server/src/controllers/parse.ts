import express from 'express';
import { parseWithIchiran } from '../ichiran.js';

export const parseJpInput = async (req: express.Request, res: express.Response) => { 
    const { sentence } = req.body; 

    if (!sentence || typeof sentence !== 'string') {
        return res.status(400).json({ error: 'Input must be a string and must not be empty' });
    }try{
        const result = await parseWithIchiran(sentence);
        return res.json({ tokens: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to parse text.'});
    }
}

