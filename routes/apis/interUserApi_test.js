import { doReport } from "../../services/reportService.js";
import { formatDate } from "../../utils/dateUtil.js";
import { getAverages, getAveragesForDay } from './interUserApi.js'
import { assertEquals } from '../../deps.js'

Deno.test({
  name: "Calling API for the last 7 day average values returns correctly averaged values",
  async fn() {
    const dayInMilliseconds = 24 * 3600 * 1000;
    await doReport(1, formatDate(new Date()), {
      morningMood: 4,
      eveningMood: 5,
      studyDuration: 3,
    });
    await doReport(1, formatDate(new Date().getTime() - dayInMilliseconds), {
      morningMood: 4,
      eveningMood: 5,
      studyDuration: 3,
    });
    await doReport(1, formatDate(new Date().getTime() - 2 * dayInMilliseconds), {
      morningMood: 4,
      eveningMood: 5,
      studyDuration: 3,
    });
    await doReport(1, formatDate(new Date().getTime() - 3 * dayInMilliseconds), {
      morningMood: 4,
      eveningMood: 5,
      studyDuration: 3,
    });
    await doReport(1, formatDate(new Date().getTime() - 4 * dayInMilliseconds), {
      morningMood: 4,
      eveningMood: 5,
      studyDuration: 3,
    });
    await doReport(1, formatDate(new Date().getTime() - 5 * dayInMilliseconds), {
      morningMood: 4,
      eveningMood: 5,
      studyDuration: 3,
    });
    await doReport(1, formatDate(new Date().getTime() - 6 * dayInMilliseconds), {
      morningMood: 4,
      eveningMood: 5,
      studyDuration: 3,
    });
    const context = { response: { body: {} } }
    await getAverages(context)

    assertEquals(Object.keys(context.response.body).length, 7)

    assertEquals(context.response.body[formatDate(new Date())].avgStudyDuration, 3)
    assertEquals(context.response.body[formatDate(new Date())].avgMood, 4.5)

    assertEquals(context.response.body[formatDate(new Date().getTime() - 3 * dayInMilliseconds)].avgStudyDuration, 3)
    assertEquals(context.response.body[formatDate(new Date().getTime() - 3 * dayInMilliseconds)].avgMood, 4.5)

    assertEquals(context.response.body[formatDate(new Date().getTime() - 6 * dayInMilliseconds)].avgStudyDuration, 3)
    assertEquals(context.response.body[formatDate(new Date().getTime() - 6 * dayInMilliseconds)].avgMood, 4.5)
  },
  sanitizeResources: false,
  sanitizeOps: false,
});


Deno.test({ 
  name: "Calling API for a single day average returns correctly averaged value",
  async fn() {
    await doReport(1, '2017-05-06', {
      morningMood: 4,
      eveningMood: 5,
      studyDuration: 3,
    });

    const context = { response: { body: {} }, params: { year: '2017', month: '05', day: '06' } }
    await getAveragesForDay(context)
    
    assertEquals(context.response.body.avgStudyDuration, 3)
    assertEquals(context.response.body.avgMood, 4.5)
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
