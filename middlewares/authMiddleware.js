const authMiddleware = async({request, response, session}, next) => {
  if (request.url.pathname.startsWith('/auth') || request.url.pathname.startsWith('/api') || request.url.pathname === '/') {
    await next();
  } else {
    if (session && await session.get('authenticated')) {
      await next();
    } else {
      response.status = 401;
      response.redirect('/auth/login')
    }
  }
}

export { authMiddleware }
