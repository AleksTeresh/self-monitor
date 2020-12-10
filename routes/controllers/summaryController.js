import {
  getWeekSummary,
  getMonthSummary,
} from "../../services/summaryService.js";
import { getWeek } from "../../utils/dateUtil.js";

const showSummary = async ({ render, request, response, session }) => {
  const params = request.url.searchParams;

  const user = await session.get("user");

  const weekParam = params.get("week");
  const monthParam = params.get("month");

  if (!weekParam || !monthParam) {
    const today = new Date();
    const thisWeek = getWeek(today);
    const thisMonth = today.getMonth() + 1;
    const thisYear = today.getFullYear();
    response.redirect(
      `/behavior/summary?week=${thisYear}-W${thisWeek}&month=${thisYear}-${thisMonth}`
    );
    return
  }

  const week = weekParam.split("-")[1].slice(1);
  const weekYear = weekParam.split("-")[0];

  const month = monthParam.split("-")[1];
  const monthYear = monthParam.split("-")[0];

  const weekSummary = await getWeekSummary(user.id, week, weekYear);
  const monthSummary = await getMonthSummary(
    user.id,
    `${monthYear}-${month}-01`
  );

  render("summary/index.ejs", {
    weekSummary,
    monthSummary,
    initialWeek: weekParam,
    initialMonth: monthParam,
    user
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
