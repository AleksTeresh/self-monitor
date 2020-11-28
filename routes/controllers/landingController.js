import { getMoodAverage } from "../../services/interUserService.js";

const showLandingPage = async ({ render, request, response, session }) => {
  const moodAverages = await getMoodAverage(
    new Date(new Date().getTime() - 3 * 24 * 3600 * 1000).toDateString(),
    new Date().toDateString()
  );
  console.log(moodAverages)
  render("index.ejs", {
    moodAverages,
    moodTrendUp:
      moodAverages.length === 2 &&
      moodAverages[1].avgMood > moodAverages[0].avgMood,
  });
};

export { showLandingPage };
