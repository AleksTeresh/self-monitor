import { superoak, assertStringIncludes, assertEquals } from "../../deps.js";
import app from "../../app.js";
import { authenticate } from './authController.js'

Deno.test({
  name: "Trying to login with wrong credentials shows 'Invalid email or password' message",
  async fn() {
    const testClient = await superoak(app)
    const response = await testClient.post("/auth/login")
      .send('email=test@test.test&password=tester123123')
    
    assertStringIncludes(response.xhr.response, 'Invalid email or password')
  },
  sanitizeResources: false,
  sanitizeOps: false
});

Deno.test({
  name: "Trying to login with correct credentials redirects to a landing page",
  async fn() {
    let redirectPath = ''
    await authenticate({
      request: { body: () => ({ value: { get: (n) => n === 'email' ? 'test@test.test' : 'tester123' } }) },
      response: { redirect: (path) => { redirectPath = path; } },
      session: { set: () => {} }
    })

    assertEquals(redirectPath, '/')
  },
  sanitizeResources: false,
  sanitizeOps: false
});

Deno.test({
  name: "Trying to login with correct credentials correctly sets data in session",
  async fn() {
    let sessionDate = {}
    await authenticate({
      request: { body: () => ({ value: { get: (n) => n === 'email' ? 'test@test.test' : 'tester123' } }) },
      response: { redirect: (path) => { } },
      session: { set: (prop, val) => { sessionDate[prop] = val; } }
    })

    assertEquals(sessionDate['authenticated'], true)
    assertEquals(sessionDate['user'].email, 'test@test.test')
  },
  sanitizeResources: false,
  sanitizeOps: false
});
