import express from 'express';
import UserController from './app/controllers/UserController';

const routes = express.Router();

routes.post('/users', UserController.store);
routes.post('/sessions', UserController.store);

export default routes;
