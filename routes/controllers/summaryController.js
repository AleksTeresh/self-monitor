import {
  getWeekSummary,
  getMonthSummary,
} from "../../services/summaryService.js";

const showSummary = async ({ render, request, response, session }) => {
  const params = request.url.searchParams;

  const user = await session.get("user");

  const week = params.get("week").split("-")[1].slice(1);
  const weekYear = params.get("week").split("-")[0];

  const month = params.get("month").split("-")[1];
  const monthYear = params.get("month").split("-")[0];

  const weekSummary = await getWeekSummary(user.id, week, weekYear);
  const monthSummary = await getMonthSummary(
    user.id,
    `${monthYear}-${month}-01`
  );

  render("summary/index.ejs", {
    weekSummary,
    monthSummary,
    initialWeek: params.get("week"),
    initialMonth: params.get("month"),
  });
};

const postSummaryQuery = async ({ render, request, response, session }) => {
  const body = request.body();
  const params = await body.value;

  const newWeek = params.get("week");
  const newMonth = params.get("month");

  const week = newWeek ?? request.url.searchParams.get("week");
  const month = newMonth ?? request.url.searchParams.get("month");

  response.redirect(`/behavior/summary?week=${week}&month=${month}`);
};

export { showSummary, postSummaryQuery };
