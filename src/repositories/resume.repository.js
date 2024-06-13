import { MESSAGES } from '../constants/message.constant.js';
import { prisma } from '../utils/prisma.util.js';

export class ResumesRepository {
  createResumes = async (title, content, authorId) => {
    const createdResumes = await prisma.resume.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return createdResumes;
  };

  findResumes = async (authorId) => {
    const data = await prisma.resume.findMany({
      where: { authorId },
      include: { author: true },
    });
    return data;
  };

  readResumes = async (authorId, id) => {
    const data = await prisma.resume.findUnique({
      where: { authorId, id: +id },
      include: { author: true },
    });

    if (!data) {
      throw new Error(MESSAGES.RESUMES.COMMON.NOT_FOUND);
    }

    return data;
  };

  updateResume = async (authorId, id, title, content) => {
    const updatedResume = await prisma.resume.update({
      where: { authorId, id: +id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });
    return updatedResume;
  };

  deleteResume = async (authorId, id) => {
    const deletedResume = await prisma.resume.delete({
      where: { authorId, id: +id },
    });
    return deletedResume;
  };
}
