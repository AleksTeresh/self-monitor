import { executeQuery } from "../database/database.js";
import { keysToCamel, valuesToNumber } from "../utils/objectUtil.js";

const getAverages = async (from, to) => {
  const res = await executeQuery(
    `SELECT
    report_day,
    AVG(sleep_duration) as avg_sleep_duration,
    AVG(sleep_quality) as avg_sleep_quality,
    AVG(sport_duration) as avg_sport_duration,
    AVG(study_duration) as avg_study_duration,
    AVG(eating_regularity) as avg_eating_regularity,
    AVG(eating_quality) as avg_quality,
    cast(SUM(morning_mood) + SUM(evening_mood) as decimal) / (COUNT(morning_mood) + COUNT(evening_mood)) as avg_mood
    FROM reports WHERE report_day >= $1 AND report_day <= $2
    GROUP BY report_day ORDER BY report_day ASC;`,
    from,
    to
  );

  if (res.rowCount === 0) {
    return;
  }

  const objRes = res.rowsOfObjects();
  return objRes
    .map(keysToCamel)
    .map(valuesToNumber)
    .map((o, i) => ({ ...o, reportDay: objRes[i].report_day }));
};

const getMoodAverage = async (from, to) => {
  console.log(from, to);
  const res = await executeQuery(
    `SELECT
    report_day,
    cast(SUM(morning_mood) + SUM(evening_mood) as decimal) / (COUNT(morning_mood) + COUNT(evening_mood)) as avg_mood
    FROM reports WHERE report_day >= $1 AND report_day <= $2
    GROUP BY report_day ORDER BY report_day ASC;`,
    from,
    to
  );

  if (res.rowCount === 0) {
    return;
  }

  const objRes = res.rowsOfObjects();
  return objRes
    .map(keysToCamel)
    .map(valuesToNumber)
    .map((o, i) => ({ ...o, reportDay: objRes[i].report_day }));
};

export { getAverages, getMoodAverage };
