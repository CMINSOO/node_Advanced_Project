import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import jwt from 'jsonwebtoken';
import { AuthsService } from '../services/auth.service.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { ACCESS_TOKEN_EXPIRES_IN } from '../constants/auth.constant.js';

export class AuthsController {
  constructor() {
    this.authService = new AuthsService();
  }
  signUp = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;

      const user = await this.authService.signUp(email, password, name);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const isPasswordMatched = await this.authService.comparePassword(
        email,
        password,
      );
      if (!isPasswordMatched) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
        });
      }

      const payload = await this.authService.findUser(email);
      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: { accessToken },
      });
    } catch (err) {
      next(err);
    }
  };
}
