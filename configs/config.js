import { dotenvConfig } from "../deps.js";

const envVars = dotenvConfig({ path: `./${Deno.args[0]}` });

const config = {
  database: {
    hostname: envVars["DB_HOSTNAME"],
    database: envVars["DB_DATABASE"],
    user: envVars["DB_USER"],
    password: envVars["DB_PASSWORD"],
    port: Number(envVars["DB_PORT"]),
  },
};

export { config };
