import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentRepository from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/',(request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = appointmentsRepository.find();

  return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentRepository();

    const appointment = await createAppointment.execute({ date: parsedDate, provider });

    return response.json(appointment);
  } catch(err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
