import { bcrypt } from '../deps.js'
import { executeQuery } from '../database/database.js'
import { getUser } from './userService.js'

const authenticate = async(email, password) => {
  // check if the email exists in the database
  const userData = await getUser(email)
  if (!userData) return
  
  const hash = userData.password;

  const passwordCorrect = await bcrypt.compare(password, hash);

  if (!passwordCorrect) {
      return;
  }

  return {
    id: userData.id,
    email: userData.email
  }
}

export { authenticate }
