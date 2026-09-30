import express from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../../db/db.js';
import { deleteUserById, getAllUsers, getUserByEmail,getUserById } from '../../db/users.js';
import * as dotenv from 'dotenv';

export const test = async (req: express.Request,res: express.Response) => {
    const testUser = await getUserByEmail('skibbidy@dixoncider.com')
    res.status(200).json({ testUser });
}
export const register = async (req: express.Request,res: express.Response) => {
    try {
        const { email, password } = req.body;
        const saltRounds = 10;

        if (!email || !password){
            return res.status(400).json({ error: 'Please enter both email AND password.' });
        }

        const existingUser = await getUserByEmail(email);
        if(existingUser.rows.length > 0){
            return res.status(400).json({ error: 'User already exists'});
        } else {
            const hashpw = await bcrypt.hash(password, saltRounds);
            const newUser = await pool.query('INSERT INTO users (email,pw_hash) VALUES ($1,$2) RETURNING id, email', [email, hashpw])
            res.status(201).json({ message:`Successfully created user: email: ${newUser.rows[0].email}, id: ${newUser.rows[0].id}`});
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

export const login = async (req: express.Request,res: express.Response) => {
    const user = await getUserByEmail(req.body.email);
    const jwt = require('jsonwebtoken'); 
    const SECRET = process.env.SECRET as string;

    if(!user) {
        return res.status(400).json("user doesn't exist");
    }
    try{
        if(await bcrypt.compare(req.body.pw, user.rows[0].pw_hash)){
            const token = jwt.sign(user,SECRET,{ expiresIn: 120 });
            return res.cookie('auth_token',token, {
                httpOnly: true,
                maxAge: 3600000
            });

        } else {
            return res.status(400).send('Login failed');
        }
    }catch(error){
        console.log(error);
        return res.status(400).json(error);
    }
    
}
export const authenticateToken = (req: express.Request,res: express.Response, next) => {

}

export const showUsers = async (req: express.Request,res: express.Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users.rows);
    }catch (error){
        console.log(error);
        res.status(500).json("failed to fetch users");
    }
}

export const deleteUser = async (req: express.Request,res: express.Response) => {
    try{
        const { id } = req.body;
        const user = await getUserById(id);
        if(user.rows.length === 0){
            return res.status(400).json("user doesn't exist");
        }
        await deleteUserById(id);
        res.status(200).json('User deleted');
    } catch (error){
        res.status(400).json('Failed to delete user');
    }
}