import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   return response.json(await appointmentsRepository.find());
// });

const appointmentsController = new AppointmentsController();
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
