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

  readResumes = async (authorId, id) => {
    console.log(id);
    const resume = await this.resumesRepository.readResumes(authorId, id);

    return {
      resumeId: resume.id,
      authorName: resume.author.name,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };

  updateResume = async (authorId, id, title, content) => {
    const resume = await this.resumesRepository.readResumes(authorId, id);
    if (!resume) throw new Error('존재하지 않는 이력서입니다');

    await this.resumesRepository.updateResume(authorId, id, title, content);

    const updatedResume = await this.resumesRepository.readResumes(
      authorId,
      id,
    );

    return {
      resumeId: updatedResume.id,
      authorName: updatedResume.author.name,
      title: updatedResume.title,
      content: updatedResume.content,
      status: updatedResume.status,
      createdAt: updatedResume.createdAt,
      updatedAt: updatedResume.updatedAt,
    };
  };

  deleteResume = async (authorId, id) => {
    const resume = await this.resumesRepository.readResumes(authorId, id);
    if (!resume) throw new Error('존재하지 않는 이력서입니다');

    await this.resumesRepository.deleteResume(authorId, id);

    return {
      resumeId: resume.id,
      authorName: resume.author.name,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };
}
