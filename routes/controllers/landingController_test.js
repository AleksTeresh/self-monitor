import { doReport } from "../../services/reportService.js";
import { formatDate } from "../../utils/dateUtil.js";
import { showSummary } from './summaryController.js'
import { assertEquals, superoak, assertStringIncludes } from '../../deps.js'
import app from '../../app.js'

Deno.test({
  name: "showSummary returns correctly averages summary data for the requested week and month",
  async fn() {
    const testClient = await superoak(app);
    const response = await testClient.get("/")

    assertStringIncludes(response.xhr.response, `<a href="/auth/login"`)
    assertStringIncludes(response.xhr.response, `<a href="/auth/registration"`)
    assertStringIncludes(response.xhr.response, `<a href="/behavior/reporting"`)
    assertStringIncludes(response.xhr.response, `<a href="/behavior/summary"`)
  },
  sanitizeResources: false,
  sanitizeOps: false
});

