import { Pool } from "../deps.js";
import { config } from "../configs/config.js";

const CONCURRENT_CONNECTIONS = 5;
const connectionPool = new Pool(config.database, CONCURRENT_CONNECTIONS);

const executeQuery = async(query, ...args) => {
  const client = await connectionPool.connect();
  try {
    return await client.query(query, ...args);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }

  return null;
}

export { executeQuery };
