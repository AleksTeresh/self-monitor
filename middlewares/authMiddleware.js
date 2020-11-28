const authMiddleware = async({request, response, session}, next) => {
  if (request.url.pathname.startsWith('/auth') || request.url.pathname === '/') {
    await next();
  } else {
    if (session && await session.get('authenticated')) {
      await next();
    } else {

      await session.set('authenticated', true)
      await session.set('user', { id: 1, email: 'test@test.test' })

      response.status = 401;
    }
  }
}

export { authMiddleware }
