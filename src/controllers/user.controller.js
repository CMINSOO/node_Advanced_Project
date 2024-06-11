import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { UsersService } from '../services/user.service.js';

export class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }
  getUser = async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await this.usersService.findMe(id);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.READ_ME.SUCCEED,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };
}
