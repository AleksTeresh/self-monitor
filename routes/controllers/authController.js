import { authenticate as getUserData } from '../../services/authService.js'
import { validate, required, lengthBetween, isEmail, minLength } from '../../deps.js'

const showLoginForm = async({render}) => {
  render('auth/login.ejs', { message: null })
}

const authenticate = async({request, response, session, render}) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get('email');
  const password = params.get('password');

  const userData = await getUserData(email, password);

  if (!userData) {
    render('auth/login.ejs', { message: 'Invalid email or password' })
    return
  }

  await session.set('authenticated', true);
  await session.set('user', userData);
  response.body = 'Authentication successful!';
}

export { authenticate, showLoginForm }
