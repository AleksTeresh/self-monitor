import { superoak } from "https://deno.land/x/superoak@2.3.1/mod.ts";
import app from "../../app.js";

Deno.test("GET request to / should return correct content", async () => {
  const testClient = await superoak(app);
  await testClient.get("/").expect("");
});
