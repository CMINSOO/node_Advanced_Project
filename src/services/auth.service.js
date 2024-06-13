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
      createAt: createUser.createdAt,
    };
  };

  comparePassword = async (email, password) => {
    const user = await this.authRepository.getUser(email);
    if (!user) {
      return false;
    }
    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    return isPasswordMatched;
  };

  findUser = async (email) => {
    const payload = this.authRepository.findUser(email);
    return payload;
  };

  definePayloadUser = async (id) => {
    const user = await this.authRepository.definePayloadUser(id);
    return user;
  };
}
