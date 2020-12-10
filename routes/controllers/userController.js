import { register as createUser, getUser } from '../../services/userService.js'
import { validate, required, lengthBetween, isEmail, minLength } from '../../deps.js'

const getRegisterData = () => ({
  verification: '',
  passoword: '',
  email: '',
  errors: []
})

const showRegisterForm = async({rende, session}) => {
  const user = await session.get("user");
  render('auth/register.ejs', {...getRegisterData(), user})
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

  const user = await session.get("user");

  const data = { email, password, user }
  const [passes, errors] = await validate(data, validationRules);

  if (!passes) {
    data.errors = errors;
    data.password = '';
    data.verification = '';
    render("auth/register.ejs", data);
    return
  }

  if (password !== verification) {
    data.errors = { verification: ['The entered passwords did not match'] };
    data.password = '';
    data.verification = '';
    render("auth/register.ejs", data);
    return;
  }

  // check if there already exists such an email in the database
  // -- if yes, respond with a message telling that the user
  // already exists
  const existingUsers = await getUser(email)
  if (existingUsers) {
    data.errors = { email: ['The email is already reserved.'] };
    data.password = '';
    data.verification = '';
    render("auth/register.ejs", data);
    return;
  }

  // otherwise, store the details in the database
  await createUser(email, password)
  response.redirect('/');
};

export { register, showRegisterForm }
