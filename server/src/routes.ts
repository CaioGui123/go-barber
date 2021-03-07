import { Router } from 'express';
import multer from 'multer';

// Controllers
import ClientController from './controllers/ClientController';
import ClientImageController from './controllers/ClientImageController';
import BarberController from './controllers/BarberController';
import BarberImageController from './controllers/BarberImageController';

// Middlewares
import requiresAuth from './middlewares/requiresAuth';
import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = Router();

// Client Schedules Routes
routes.get('/clients/:id/schedules', ClientController.showSchedules);
routes.post('/clients/:id/schedules', ClientController.saveSchedule);
routes.delete(
  '/clients/:clientId/schedules/:scheduleId',
  ClientController.removeSchedule,
);

// Clients
routes.post('/clients/login', ClientController.login);
routes.get('/clients', ClientController.index);
routes.get('/clients/:id', requiresAuth, ClientController.show);
routes.post('/clients', ClientController.register);
routes.put('/clients/:id', requiresAuth, ClientController.update);
routes.delete('/clients/:id', requiresAuth, ClientController.destroy);

// Client Images Routes
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

// Barbers Routes
routes.post('/barbers/login', BarberController.login);
routes.get('/barbers', BarberController.index);
routes.get('/barbers/:id', BarberController.show);
routes.post('/barbers', BarberController.register);
routes.put('/barbers/:id', requiresAuth, BarberController.update);
routes.delete('/barbers/:id', requiresAuth, BarberController.destroy);

// Barber Images Routes
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

export default routes;
