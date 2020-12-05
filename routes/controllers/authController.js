import { authenticate as getUserData, register as createUser, getUser } from '../../services/authService.js'
import { validate, required, lengthBetween, isEmail, minLength } from '../../deps.js'

const showLoginForm = async({render}) => {
  render('auth/login.ejs')
}

const getRegisterData = () => ({
    passoword: '',
    email: '',
    errors: []
})

const showRegisterForm = async({render}) => {
  render('auth/register.ejs', getRegisterData())
}

const authenticate = async({request, response, session}) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get('email');
  const password = params.get('password');

  const userData = await getUserData(email, password);

  if (!userData) {
    response.status = 401;
    return;
  }

  await session.set('authenticated', true);
  await session.set('user', userData);
  response.body = 'Authentication successful!';
}

const validationRules = {
  email: [required, isEmail],
  password: [required, minLength(4)],
};

const register = async({request, response, session, render}) => {
  const body = request.body();
  const params = await body.value;
  
  const email = params.get('email');
  const password = params.get('password');
  const verification = params.get('verification');

  const data = { email, password }
  const [passes, errors] = await validate(data, validationRules);

  if (!passes) {
    data.errors = errors;
    data.password = '';
    console.log(errors, passes)
    render("auth/register.ejs", data);
    return
  }

  if (password !== verification) {
    response.body = 'The entered passwords did not match';
    return;
  }

  // check if there already exists such an email in the database
  // -- if yes, respond with a message telling that the user
  // already exists
  const existingUsers = await getUser(email)
  if (existingUsers) {
    response.body = 'The email is already reserved.';
    return;
  }

  // otherwise, store the details in the database
  await createUser(email, password)
  response.body = 'Registration successful!';
};

export { authenticate, register, showLoginForm, showRegisterForm }
