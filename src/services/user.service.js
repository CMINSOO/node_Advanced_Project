import { UsersRepository } from '../repositories/user.repository.js';

export class UsersService {
  usersRepository = new UsersRepository();

  findMe = async (userId) => {
    const user = await this.usersRepository.findMe(userId);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };
}
