import express from 'express';
import { authRouter } from './auth.router.js';
import { usersRouter } from './users.router.js';
import { resumesRouter } from './resumes.router.js';
import { RequireAccessToken } from '../middlewares/require-access-token.middleware.js';

const apiRouter = express.Router();
const requireAccessTokens = new RequireAccessToken();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/resumes', requireAccessTokens.assign, resumesRouter);

export { apiRouter };
