import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';

// import User from '../infra/typeorm/entities/User';

// interface IRequest {
//   email: string;
// }

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(): Promise<void> {}
}

export default SendForgotPasswordEmailService;
