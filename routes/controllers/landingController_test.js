import { doReport } from "../../services/reportService.js";
import { formatDate } from "../../utils/dateUtil.js";
import { showSummary } from './summaryController.js'
import { assertEquals, superoak, assertStringIncludes } from '../../deps.js'
import app from '../../app.js'

Deno.test({
  name: "Landing page contains links to login, registration, reporting and summary pages",
  async fn() {
    const testClient = await superoak(app);
    const response = await testClient.get("/")

    assertStringIncludes(response.xhr.response, `href="/auth/login"`)
    assertStringIncludes(response.xhr.response, `href="/auth/registration"`)
    assertStringIncludes(response.xhr.response, `href="/behavior/reporting"`)
    assertStringIncludes(response.xhr.response, `href="/behavior/summary"`)
  },
  sanitizeResources: false,
  sanitizeOps: false
});

