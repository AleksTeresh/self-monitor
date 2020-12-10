import { doReport } from "../../services/reportService.js";
import { formatDate } from "../../utils/dateUtil.js";
import { showSummary } from './summaryController.js'
import { assertEquals } from '../../deps.js'


Deno.test({
  name: "GET / returns 200", 
  async fn() {
    await doReport(1, '2020-12-10', {
      morningMood: 4,
      eveningMood: 5,
      studyDuration: 3,
    });
    await doReport(1, '2020-12-09', {
      morningMood: 4,
      eveningMood: 5,
      studyDuration: 3,
    });
    await doReport(1, '2020-12-08', {
      morningMood: 4,
      eveningMood: 5,
      studyDuration: 3,
    });
    await doReport(1, '2020-12-07', {
      morningMood: 4,
      eveningMood: 5,
      studyDuration: 3,
    });

    let responseParams = {}
    const context = {
      render: (str, params) => {
        responseParams = params
      },
      request: { url: { searchParams: { get: (name) => name == 'week' ? '2020-W50' : '2020-12' } } },
      session: { get: () => ({ id: 1 }) },
    }
    await showSummary(context)

    assertEquals(responseParams.weekSummary.avgStudyDuration, 3)
    assertEquals(responseParams.weekSummary.avgMood, 4.5)

    assertEquals(responseParams.monthSummary.avgStudyDuration, 3)
    assertEquals(responseParams.monthSummary.avgMood, 4.5)
  },
  sanitizeResources: false,
  sanitizeOps: false
});
