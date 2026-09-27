import express from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../../db/db.js';
import { getUserByEmail } from '../../db/users.js';

export const register = async (req: express.Request,res: express.Response) => {
    try {
        const { email, password } = req.body;
        const saltRounds = 10;

        if (!email || !password){
            return res.status(400).json({ error: 'Please enter both email AND password.' });
        }

        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.status(400).json({ error: 'User already exists'});
        } else {
            const hashpw = await bcrypt.hash(password, saltRounds);
            const newUser = await pool.query('INSERT INTO users (email,pw_hash) VALUES ($1,$2) RETURNING id, email', [email, hashpw])
            res.status(201).json({ message:`Successfully created user: email: ${newUser.rows[0].email}, id: ${newUser.rows[0].id}`});
        }

    } catch (error) {
        console.log(error);
        return res.status(400);
    }
}

export const login = async (req: express.Request,res: express.Response) => {
    const user = await getUserByEmail(req.body.email);

    if(!user) {
        return res.status(400);
    }
    try{
        if(await bcrypt.compare(req.body.pw, user.pw_hash)){
            return res.status(200).send('Success. Welcome.');
        } else {
            return res.status(400).send('Login failed');
        }
    }catch(error){
        console.log(error);
        return res.status(400);
    }
    const jwt = require('jsonwebtoken'); 
}