import { prisma } from '../utils/prisma.util.js';

export class AuthRepository {
  getUser = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  };

  createUser = async (email, password, name) => {
    return await prisma.user.create({
      data: { email, password, name },
    });
  };
}
