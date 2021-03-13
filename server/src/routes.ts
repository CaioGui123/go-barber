import { Router } from 'express';
import multer from 'multer';

// Controllers
import ClientController from './controllers/Client/ClientController';
import ClientImageController from './controllers/Client/ImageController';
import ClientScheduleController from './controllers/Client/ScheduleController';
import BarberController from './controllers/Barber/BarberController';
import BarberImageController from './controllers/Barber/ImageController';
import BarberScheduleController from './controllers/Barber/ScheduleController';

// Middlewares
import requiresAuth from './middlewares/requiresAuth';
import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = Router();

// Clients
routes.post('/clients/login', ClientController.login);
routes.get('/clients', ClientController.index);
routes.get('/clients/:id', requiresAuth, ClientController.show);
routes.post('/clients', ClientController.register);
routes.put('/clients/:id', requiresAuth, ClientController.update);
routes.delete('/clients/:id', requiresAuth, ClientController.destroy);

// Client Images
routes.post(
  '/clients/:id/image',
  requiresAuth,
  upload.array('image', 1),
  ClientImageController.store,
);
routes.delete(
  '/clients/:id/image',
  requiresAuth,
  ClientImageController.destroy,
);

// Client Schedules
routes.get('/clients/:id/schedules', ClientScheduleController.getPendings);
routes.get('/clients/:id/schedules/history', ClientScheduleController.history);
routes.get(
  '/clients/:clientId/schedules/:scheduleId',
  ClientScheduleController.show,
);
routes.post('/clients/:id/schedules', ClientScheduleController.store);
routes.delete(
  '/clients/:clientId/schedules/:scheduleId',
  ClientScheduleController.destroy,
);

// Client Rating
routes.post(
  '/clients/:clientId/ratings/:barberId/:rateId?',
  ClientController.rateBarber,
);

// Barbers
routes.post('/barbers/login', BarberController.login);
routes.get('/barbers', BarberController.index);
routes.get('/barbers/:id', BarberController.show);
routes.post('/barbers', BarberController.register);
routes.put('/barbers/:id', requiresAuth, BarberController.update);
routes.delete('/barbers/:id', requiresAuth, BarberController.destroy);

// Barber Images
routes.post(
  '/barbers/:id/images',
  requiresAuth,
  upload.array('images[]', 10),
  BarberImageController.massStore,
);
routes.delete(
  '/barbers/:barberId/images/:imageId',
  requiresAuth,
  BarberImageController.destroy,
);

// Barber Schedules
routes.get('/barbers/:id/schedules', BarberScheduleController.getPedings);
routes.get('/barbers/:id/schedules/history', BarberScheduleController.history);
routes.get(
  '/barbers/:barberId/schedules/:scheduleId',
  BarberScheduleController.show,
);
routes.post(
  '/barbers/:barberId/schedules/:scheduleId/accept',
  BarberScheduleController.acceptSchedule,
);
routes.post(
  '/barbers/:barberId/schedules/:scheduleId/dont-accept',
  BarberScheduleController.dontAcceptSchedule,
);

// Barber Ratings
routes.get('/barbers/:id/ratings', BarberController.getRatings);

export default routes;
