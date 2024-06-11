import express from 'express';
import { UsersController } from '../controllers/user.controller.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';

const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.get('/me', requireAccessToken, usersController.getUser);

export { usersRouter };
