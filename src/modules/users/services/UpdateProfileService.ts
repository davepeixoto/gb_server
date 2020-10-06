import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/ApError';
import IGenerateHash from '@modules/users/providers/HashProvider/interfaces/IGenerateHash';
import ICompareHash from '@modules/users/providers/HashProvider/interfaces/ICompareHash';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('GenerateHash')
    private generateHash: IGenerateHash,

    @inject('CompareHash')
    private compareHash: ICompareHash,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const checkUserEmailAvaliable = await this.userRepository.findByEmail(
      email,
    );

    if (checkUserEmailAvaliable && checkUserEmailAvaliable.id !== user_id) {
      throw new AppError('Email already used');
    }

    if (password && !old_password) {
      throw new AppError('On change password, old password must be informed');
    }

    if (password && old_password) {
      if (!(await this.compareHash.execute(old_password, user.password))) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.generateHash.execute(password);
    }

    user.name = name;
    user.email = email;

    return this.userRepository.save(user);
  }
}

export default UpdateProfileService;
