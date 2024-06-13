import { ResumesRepository } from '../repositories/resume.repository.js';

export class ResumesService {
  resumesRepository = new ResumesRepository();

  createResumes = async (title, content, authorId) => {
    const data = await this.resumesRepository.createResumes(
      title,
      content,
      authorId,
    );
    return {
      authorId: data.authorId,
      title: data.title,
      content: data.content,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  };

  findResumes = async (authorId) => {
    const resumes = await this.resumesRepository.findResumes(authorId);

    resumes.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return resumes.map((resume) => {
      return {
        id: resume.id,
        authorName: resume.author.name,
        title: resume.title,
        content: resume.content,
        status: resume.status,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });
  };
}
