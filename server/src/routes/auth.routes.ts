import { Router } from 'express';
import express from 'express';

import { register,login } from '../controllers/authentication.js'

const r = Router();

r.post('/register', register);

r.post('/login', login);

export default r;