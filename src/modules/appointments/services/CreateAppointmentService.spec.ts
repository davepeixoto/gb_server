import { v4 as uuid } from 'uuid';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/ApError';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment', async () => {
    const createAppointmentService = new CreateAppointmentService(
      new FakeAppointmentsRepository(),
    );

    const provider_id = uuid();
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(provider_id);
  });

  it('should not be abble to create two appointment on the same time', async () => {
    const createAppointmentService = new CreateAppointmentService(
      new FakeAppointmentsRepository(),
    );

    const provider_id = uuid();
    const date = new Date(); // year, month-1, day, hour
    await createAppointmentService.execute({
      date,
      provider_id,
    });

    expect(
      createAppointmentService.execute({
        date,
        provider_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
