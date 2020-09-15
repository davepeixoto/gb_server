import AppError from '@shared/errors/ApError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeGenerateHash from '@modules/users/providers/HashProvider/fakes/FakeGenerateHash';

let fakeUsersRepository: FakeUsersRepository;
let fakeGenerateHash: FakeGenerateHash;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeGenerateHash = new FakeGenerateHash();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeGenerateHash,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('johndude@example.com');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'John Dude',
        email: 'johndude@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
