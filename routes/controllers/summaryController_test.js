import { doReport } from "../../services/reportService.js";
import { formatDate } from "../../utils/dateUtil.js";
import { showSummary } from './summaryController.js'
import { getWeek } from "../../utils/dateUtil.js";
import { assertEquals } from '../../deps.js'

Deno.test({
  name: "showSummary returns correctly averages summary data for the requested week and month",
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

Deno.test({
  name: "Missing week as parameter when calling showSummary causes redirect with current week and month",
  async fn() {
    let redirectPath = ''
    const context = {
      render: (str, params) => {},
      response: { redirect: (path) => { redirectPath = path; } },
      request: { url: { searchParams: { get: (name) => name == 'week' ? '' : '2020-12' } } },
      session: { get: () => ({ id: 1 }) },
    }
    await showSummary(context)

    const today = new Date();
    const thisWeek = getWeek(today);
    const thisMonth = today.getMonth() + 1;
    const thisYear = today.getFullYear();

    assertEquals(redirectPath, `/behavior/summary?week=${thisYear}-W${thisWeek}&month=${thisYear}-${thisMonth}`)
  },
  sanitizeResources: false,
  sanitizeOps: false
});

Deno.test({
  name: "Missing month as parameter when calling showSummary causes redirect with current week and month",
  async fn() {
    let redirectPath = ''
    const context = {
      render: (str, params) => {},
      response: { redirect: (path) => { redirectPath = path; } },
      request: { url: { searchParams: { get: (name) => name == 'week' ? '2020-W50'  : '' } } },
      session: { get: () => ({ id: 1 }) },
    }
    await showSummary(context)

    const today = new Date();
    const thisWeek = getWeek(today);
    const thisMonth = today.getMonth() + 1;
    const thisYear = today.getFullYear();

    assertEquals(redirectPath, `/behavior/summary?week=${thisYear}-W${thisWeek}&month=${thisYear}-${thisMonth}`)
  },
  sanitizeResources: false,
  sanitizeOps: false
});
