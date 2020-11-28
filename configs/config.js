import { dotenv } from '../deps.js'

const config = {
  database: {
    hostname: Deno.env.get('DB_HOSTNAME'),
    database: Deno.env.get('DB_DATABASE'),
    user: Deno.env.get('DB_USER'),
    password: Deno.env.get('DB_PASSWORD'),
    port: Number(Deno.env.get('DB_PORT'))
  }
};

export { config };
