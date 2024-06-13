import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { ResumesService } from '../services/resume.service.js';

export class ResumesController {
  resumesService = new ResumesService();

  //   이력서 생성
  postResumes = async (req, res, next) => {
    try {
      const user = req.user;
      const { title, content } = req.body;
      const authorId = user.id;

      const data = await this.resumesService.createResumes(
        title,
        content,
        authorId,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESUMES.CREATE.SUCCEED,
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 조회
  getResumes = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      let data = await this.resumesService.findResumes(authorId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}
