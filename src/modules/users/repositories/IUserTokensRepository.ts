import UserToken from '@modules/users/infra/typeorm/entities/UserTokens';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
}
