import { Router } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../db.js';

const router = Router();

router.post('/register', async (req,res) => {
    const email = req.body.email;
    const pw    = req.body.pw;

    if (!email || !pw){
        res.status(400).json({ error: 'Please enter both email AND password.' });
        return;
    }
    try{
        const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if(result.rows.length > 0){
            res.status(409).json({ error: 'An account with this email already exists.' });
        }
    } 
        catch(err){
            
    } 
});

export default router;