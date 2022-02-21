import {Router} from 'express' ;
import {Register, Login, renderLogin} from "./auth.controller";

const router = Router();

router.get('/login', renderLogin);


router.post('/register', Register);
router.post('/login', Login);

export default router;