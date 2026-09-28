import { Router } from 'express';
import express from 'express';
import { register,login,deleteUser,showUsers,test } from '../controllers/authentication.js'

const r = Router();

r.post('/register', register);

r.post('/login', login);

r.get('/users', showUsers);

r.put('/delete', deleteUser);

r.get('/test', test)

export default r;