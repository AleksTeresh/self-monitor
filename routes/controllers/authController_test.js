import { superoak, assertStringIncludes } from "../../deps.js";
import app from "../../app.js";

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
  name: "Trying to login with correct credentials shows 'Authentication successful!' message",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/auth/login")
      .send('email=test@test.test&password=tester123')
      .expect('Authentication successful!');
  },
  sanitizeResources: false,
  sanitizeOps: false
});
