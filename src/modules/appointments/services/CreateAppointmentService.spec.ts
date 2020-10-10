import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
beforeEach(() => {
  fakeAppointmentsRepository = new FakeAppointmentsRepository();
  createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
})

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456434',
      user_id: 'user',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456434');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: new Date(),
      provider_id: '123456434',
      user_id: 'user',
    });

    expect(
      createAppointment.execute({
        date: new Date(),
        provider_id: '123456434',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
