import { Router } from 'express';
import {Auth} from '../middleware/auth';
import * as ApiController from '../controllers/apiController';
import * as emailcontroller from '../controllers/emailcontroller';
import {privateRouter} from '../config/passport';

const router = Router();

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);
router.get('/list', privateRouter, ApiController.list);
router.post('/contato', emailcontroller.contato);

export default router; 