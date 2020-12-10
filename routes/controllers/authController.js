import { authenticate as getUserData } from '../../services/authService.js'
import { validate, required, lengthBetween, isEmail, minLength } from '../../deps.js'

const showLoginForm = async({render, session}) => {
  const user = await session.get("user");
  render('auth/login.ejs', { message: null, user })
}

const authenticate = async({request, response, session, render}) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get('email');
  const password = params.get('password');

  const userData = await getUserData(email, password);

  if (!userData) {
    const user = await session.get("user");
    render('auth/login.ejs', { message: 'Invalid email or password', user })
    return
  }

  await session.set('authenticated', true);
  await session.set('user', userData);
  response.body = 'Authentication successful!';
}

const logout = async({ session, response }) => {
  await session.set('authenticated', false);
  await session.set('user', undefined);

  response.redirect('/')
}

export { authenticate, showLoginForm, logout }
