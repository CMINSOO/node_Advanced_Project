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

  findUser = async (email) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    const payload = { id: +user.id };
    return payload;
  };

  definePayloadUser = async (id) => {
    const user = await prisma.user.findUnique({
      where: { id: +id },
      omit: { password: true },
    });
    console.log(id);
    return user;
  };
}
