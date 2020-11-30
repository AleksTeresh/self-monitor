import { getMoodAverage } from "../../services/interUserService.js";
import { formatDate } from '../../utils/dateUtil.js'

const showLandingPage = async ({ render, request, response, session }) => {
  const today = new Date()
  const yesterday = new Date(new Date().getTime() - 1 * 24 * 3600 * 1000)

  const moodAverages = await getMoodAverage(
    yesterday.toDateString(),
    today.toDateString()
  );

  const todayString = formatDate(today)
  const yesterdayString = formatDate(yesterday)

  render("index.ejs", {
    moodAverages,
    todayString,
    yesterdayString,
    showTrend: moodAverages[todayString] && moodAverages[yesterdayString] && moodAverages[todayString].avgMood > 0 && moodAverages[yesterdayString].avgMood > 0,
    moodTrend: moodAverages[todayString] && moodAverages[yesterdayString] && moodAverages[todayString].avgMood - moodAverages[yesterdayString].avgMood,
  });
};

export { showLandingPage };
