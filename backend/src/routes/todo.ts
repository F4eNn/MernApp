import { Router } from 'express';

import { postTodo, getTodo } from '../controller/todo';

export const router = Router();

router.post('/todo', postTodo);
router.get('/todo', getTodo);
