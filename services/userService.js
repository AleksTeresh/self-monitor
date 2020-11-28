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

export { getUser, addUser }
