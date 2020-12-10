import { superoak, assertStringIncludes } from "../../deps.js";
import app from "../../app.js";

Deno.test({
  name: "Trying to register with existing email returns relevant failure message", 
  async fn() {
    const testClient = await superoak(app);
    const response = await testClient.post("/auth/registration")
      .send('email=test@test.test&password=tester123&verification=tester123')

    assertStringIncludes(response.xhr.response, "The email is already reserved.")
  },
  sanitizeResources: false,
  sanitizeOps: false
});

Deno.test({
  name: "Trying to register with password verification that does not match password returns relevant failure message", 
  async fn() {
    const testClient = await superoak(app);
    const response = await testClient.post("/auth/registration")
      .send('email=test@test.test&password=tester123&verification=tester1234')

    assertStringIncludes(response.xhr.response, 'The entered passwords did not match')
  },
  sanitizeResources: false,
  sanitizeOps: false
});

Deno.test({
  name: "Short password are not accepted and validation error is shown", 
  async fn() {
    const testClient = await superoak(app);
    const response = await testClient.post("/auth/registration")
      .send('email=test@test.test&password=123&verification=123')

    assertStringIncludes(response.xhr.response, "password cannot be lower than 4 characters")
  },
  sanitizeResources: false,
  sanitizeOps: false
});
