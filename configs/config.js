let config = {};

if (Deno.env.get('DATABASE_URL')) {
  config.database = Deno.env.get('DATABASE_URL');
} else {
  config.database = {};
}

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}
config.port = port

export { config }; 
