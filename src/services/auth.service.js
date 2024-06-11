import { AuthRepository } from '../repositories/auth.repository.js';
import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import bcrypt from 'bcrypt';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';

export class AuthsService {
  authRepository = new AuthRepository();

  signUp = async (email, password, name) => {
    const existUser = await this.authRepository.getUser(email);
    if (existUser) {
      throw new HttpError.BadRequest(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
    }

    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    const createUser = await this.authRepository.createUser(
      email,
      hashedPassword,
      name,
    );

    return {
      userId: createUser.userId,
      email: createUser.email,
      name: createUser.name,
      createAt: createUser.createAt,
    };
  };
}
