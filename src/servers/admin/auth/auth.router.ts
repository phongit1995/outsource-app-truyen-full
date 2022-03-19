import { Router } from 'express';
import { Register, Login, renderLogin, logoutController } from './auth.controller';

const router = Router();

router.get('/login', renderLogin);

router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', logoutController);
export default router;
