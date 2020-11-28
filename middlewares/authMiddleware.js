const authMiddleware = async({request, response, session}, next) => {
  if (request.url.pathname.startsWith('/auth')) {
    await next();
  } else {
    if (session && await session.get('authenticated')) {
      await next();
    } else {
      response.status = 401;
    }
  }
}

export { authMiddleware }
