import AppError from '@shared/errors/ApError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeGenerateHash from '@modules/users/providers/HashProvider/fakes/FakeGenerateHash';
import FakeCompareHash from '@modules/users/providers/HashProvider/fakes/FakeCompareHash';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeGenerateHash: FakeGenerateHash;
let fakeCompareHash: FakeCompareHash;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeGenerateHash = new FakeGenerateHash();
    fakeCompareHash = new FakeCompareHash();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeGenerateHash,
      fakeCompareHash,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    const updatedeUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Name Changed',
      email: 'emailchanged@exemple.com',
    });

    expect(updatedeUser.name).toBe('Name Changed');
    expect(updatedeUser.email).toBe('emailchanged@exemple.com');
  });

  it('should not be able to update to non-existing user', async () => {
    await fakeUsersRepository.create({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: 'Non-existing',
        name: 'Name Changed',
        email: 'johndude@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update email to non unique email', async () => {
    await fakeUsersRepository.create({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test user',
      email: 'testemail@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Name Changed',
        email: 'johndude@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    const updatedPassword = await updateProfileService.execute({
      user_id: user.id,
      name: 'Name Changed',
      email: 'johndude@example.com',
      old_password: '123456',
      password: '123123',
    });

    await expect(updatedPassword.password).toBe('123123');
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Name Changed',
        email: 'johndude@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Name Changed',
        email: 'johndude@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
