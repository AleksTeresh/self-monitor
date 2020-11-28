
const requestTimingMiddleware = async({ request, session }, next) => {
  const authed = await session.get('authenticated')
  const userId = authed ? (await session.get('user')).id : '<anonymous>'
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${new Date(start).toISOString()} ${request.method} ${request.url.pathname} ${userId} - ${ms} ms`);
}

export { requestTimingMiddleware }
