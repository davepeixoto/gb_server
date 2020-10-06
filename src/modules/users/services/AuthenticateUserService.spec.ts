import AppError from '@shared/errors/ApError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCompareHash from '@modules/users/providers/HashProvider/fakes/FakeCompareHash';
import FakeGenerateHash from '@modules/users/providers/HashProvider/fakes/FakeGenerateHash';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCompareHash: FakeCompareHash;
let fakeGenerateHash: FakeGenerateHash;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCompareHash = new FakeCompareHash();
    fakeGenerateHash = new FakeGenerateHash();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeCompareHash,
    );
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeGenerateHash,
    );
  });

  it('should be able to authenticate', async () => {
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
    await createUserService.execute({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    const response = authenticateUserService.execute({
      email: 'johndude@example.com',
      password: '32115',
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong email', async () => {
    await createUserService.execute({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    const response = authenticateUserService.execute({
      email: 'differentemail@example.com',
      password: '123456',
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const response = authenticateUserService.execute({
      email: 'nonexisting@example.com',
      password: '123456',
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });
});
