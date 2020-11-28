import { Router } from "../deps.js";
import { authenticate, register, showLoginForm, showRegisterForm } from './controllers/authController.js'

const router = new Router();

router.get('/', ({ response }) => { response.body="Landing page"; })

router.get('/auth/login', showLoginForm);
router.get('/auth/registration', showRegisterForm);
router.post('/auth/login', authenticate);
router.post('/auth/register', register);

export { router };
