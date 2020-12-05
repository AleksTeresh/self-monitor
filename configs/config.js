import { dotenvConfig } from "../deps.js";

const envVars = dotenvConfig({ path: `./${Deno.args[0] || 'dev.env'}` });

const config = {
  database: {
    hostname: envVars["DB_HOSTNAME"],
    database: envVars["DB_DATABASE"],
    user: envVars["DB_USER"],
    password: envVars["DB_PASSWORD"],
    port: Number(envVars["DB_PORT"]),
  },
};
console.log(config)
export { config };
