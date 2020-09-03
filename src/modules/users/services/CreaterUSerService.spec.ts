import AppError from '@shared/errors/ApError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeGenerateHash from '@modules/users/providers/HashProvider/fakes/FakeGenerateHash';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeGenerateHash = new FakeGenerateHash();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeGenerateHash,
    );

    const user = await createUserService.execute({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('johndude@example.com');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeGenerateHash = new FakeGenerateHash();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeGenerateHash,
    );

    await createUserService.execute({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'John Dude',
        email: 'johndude@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
