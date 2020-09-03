import AppError from '@shared/errors/ApError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCompareHash from '@modules/users/providers/HashProvider/fakes/FakeCompareHash';
import FakeGenerateHash from '@modules/users/providers/HashProvider/fakes/FakeGenerateHash';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeCompareHash = new FakeCompareHash();
    const fakeGenerateHash = new FakeGenerateHash();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeCompareHash,
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeGenerateHash,
    );

    const user = await createUserService.execute({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'johndude@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeCompareHash = new FakeCompareHash();
    const fakeGenerateHash = new FakeGenerateHash();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeCompareHash,
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeGenerateHash,
    );

    await createUserService.execute({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    const response = authenticateUserService.execute({
      email: 'johndude@example.com',
      password: '32115',
    });

    expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeCompareHash = new FakeCompareHash();
    const fakeGenerateHash = new FakeGenerateHash();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeCompareHash,
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeGenerateHash,
    );

    await createUserService.execute({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    const response = authenticateUserService.execute({
      email: 'differentemail@example.com',
      password: '123456',
    });

    expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeCompareHash = new FakeCompareHash();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeCompareHash,
    );
    const response = authenticateUserService.execute({
      email: 'nonexisting@example.com',
      password: '123456',
    });

    expect(response).rejects.toBeInstanceOf(AppError);
  });
});
