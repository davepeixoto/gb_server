import AppError from '@shared/errors/ApError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    const profileShown = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profileShown.name).toBe('John Dude');
    expect(profileShown.email).toBe('johndude@example.com');
  });

  it('should not be show the profile for inexistent user', async () => {
    await fakeUsersRepository.create({
      name: 'John Dude',
      email: 'johndude@example.com',
      password: '123456',
    });

    await expect(
      showProfileService.execute({
        user_id: '12321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
