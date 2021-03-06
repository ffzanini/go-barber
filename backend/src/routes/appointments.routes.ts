import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsServices from '../service/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const {provider, date } = request.body;

    const parserdDate = parseISO(date);

    const createAppointment = new CreateAppointmentsServices();
    const appointment = await createAppointment.execute({ date: parserdDate, provider });
    return response.json(appointment);

  } catch (err) {
    return response.status(400).json({ error: err.message});
  }
})
export default appointmentsRouter;
