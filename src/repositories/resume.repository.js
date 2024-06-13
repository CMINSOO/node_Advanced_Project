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
}
