import { Router } from 'express';
import multer from 'multer';

import ClientController from './controllers/ClientController';
import BarberController from './controllers/BarberController';
import BarberImageController from './controllers/BarberImageController';

import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = Router();

// Clients Routes
routes.get('/clients', ClientController.index);
routes.get('/clients/:id', ClientController.show);
routes.post('/clients', ClientController.store);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.destroy);

// Barbers Routes
routes.get('/barbers', BarberController.index);
routes.get('/barbers/:id', BarberController.show);
routes.post('/barbers', BarberController.store);
routes.put('/barbers/:id', BarberController.update);
routes.delete('/barbers/:id', BarberController.destroy);

// Barber Images Routes
routes.post(
  '/barbers/:id/images',
  upload.array('images[]', 10),
  BarberImageController.storeImages,
);
routes.delete(
  '/barbers/:barberId/images/:imageId',
  BarberImageController.removeImage,
);

export default routes;
