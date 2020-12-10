import { superoak, assertEquals } from '../deps.js'
import app from "../app.js";

Deno.test({
  name: "GET request to / should return correct content",
  async fn () {
    const testClient = await superoak(app);
    const response = await testClient.get("/")
    // assertEquals("Hello", "Hello")
    assertEquals(response.statusCode, 200)
  },
  sanitizeResources: false,
  sanitizeOps: false
});
