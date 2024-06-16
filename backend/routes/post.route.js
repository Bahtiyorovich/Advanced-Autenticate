import express from 'express';
import postController from '../controllers/post.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';
import authorMiddleware from '../middlewares/author.middleware.js';

const router = express.Router()

router.get('/get-posts', postController.getAll)
router.post('/create-post', authMiddleware, postController.create)
router.delete('/delete-post/:id', authMiddleware, authorMiddleware, postController.delete)
router.put('/edit-post/:id', authMiddleware, authorMiddleware, postController.edit)
router.get('/get-one-post/:id', postController.getOne)

export default router;