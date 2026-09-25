import { Router } from 'express';
import express from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../db.js';

const r = Router();

r.post('/register', async (req: express.Request,res: express.Response) => {
    const { email, pw } = req.body;
    const saltRounds = 10;

    if (!email || !pw){
        res.status(400).json({ error: 'Please enter both email AND password.' });
        return;
    }
    try{
        const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if(result.rows.length > 0){
            res.status(409).json({ error: 'An account with this email already exists.' });
        }
        else {
            const hashpw = await bcrypt.hash(pw, saltRounds);
            const newUser = await pool.query('INSERT INTO users (email,pw_hash) VALUES ($1,$2) RETURNING id, email', [email, hashpw])
            res.status(201).json({ message:`Successfully created user: email: ${newUser.rows[0].email}, id: ${newUser.rows[0].id}`});
        }
    } 
        catch(err){
            console.error(err);
            res.status(500).json({error: 'error'});
    } 

});

r.post('/login', async (req,res) => {

});

export default r;