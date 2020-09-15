import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/ApError';
import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
// import IGenerateHash from '@modules/users/providers/HashProvider/interfaces/IGenerateHash';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }
    this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'Request for password recovery');
  }
}
