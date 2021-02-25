import { Router } from 'express';

import ClientController from './controllers/ClientController';

const routes = Router();

// Clients Routes
routes.get('/clients', ClientController.index);
routes.get('/clients/:id', ClientController.show);
routes.post('/clients', ClientController.store);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.destroy);

export default routes;
