import express from 'express';
import { UsersController } from '../controllers/user.controller.js';
import { RequireAccessToken } from '../middlewares/require-access-token.middleware.js';

const usersRouter = express.Router();
const usersController = new UsersController();
const requireAccessTokens = new RequireAccessToken();

usersRouter.get('/me', requireAccessTokens.assign, usersController.getUser);

export { usersRouter };
