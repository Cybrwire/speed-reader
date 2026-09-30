// db/users.ts
import { pool } from './db.js'; // wherever your Pool instance lives
import express from 'express';

export const getAllUsers = () => 
    pool.query('SELECT * FROM users');

export const getUserByEmail = (email: string) => 
    pool.query('SELECT * FROM users WHERE email = $1', [email]);

export const getUserById = (id: string) => 
    pool.query('SELECT * FROM users WHERE id = $1', [id]);

export const deleteUserById =  (id: string) =>
    pool.query('DELETE FROM users WHERE id = $1', [id]);