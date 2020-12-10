import { bcrypt } from '../deps.js'
import { executeQuery } from '../database/database.js'

const addUser = async(email, passwordHash) => {
  await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, passwordHash);
};

const getUser = async(email) => {
  const res = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
  if (res.rowCount === 0) {
      return;
  }

  // take the first row from the results
  return res.rowsOfObjects()[0];
}

const register = async(email, password) => {
  // otherwise, store the details in the database
  const hash = await bcrypt.hash(password);
  // when storing a password, store the hash    
  addUser(email, hash)
}

export { getUser, register }
