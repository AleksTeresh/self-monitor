import { executeQuery } from "../database/database.js";
import { keysToCamel, valuesToNumber } from "../utils/objectUtil.js";
import { formatDate } from '../utils/dateUtil.js'

const postprocess = (queryResult) => {
  if (queryResult.rowCount === 0) {
    return;
  }

  const objRes = queryResult.rowsOfObjects();
  return objRes
    .map(keysToCamel)
    .map(valuesToNumber)
    .map((o, i) => ({ ...o, reportDay: formatDate(objRes[i].report_day) }))
    .reduce((acc, o) => ({
      ...acc,
      [o.reportDay]: o
    }), {});
}

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
    cast(COALESCE(SUM(morning_mood), 0) + COALESCE(SUM(evening_mood), 0) as decimal) / (COUNT(morning_mood) + COUNT(evening_mood)) as avg_mood
    FROM reports WHERE report_day >= $1 AND report_day <= $2
    GROUP BY report_day ORDER BY report_day ASC;`,
    from,
    to
  );

  return postprocess(res)
};

const getMoodAverage = async (from, to) => {
  console.log(from, to);
  const res = await executeQuery(
    `SELECT
    report_day,
    cast(COALESCE(SUM(morning_mood), 0) + COALESCE(SUM(evening_mood), 0) as decimal) / (COUNT(morning_mood) + COUNT(evening_mood)) as avg_mood
    FROM reports WHERE report_day >= $1 AND report_day <= $2
    GROUP BY report_day ORDER BY report_day ASC;`,
    from,
    to
  );

  return postprocess(res)
};

export { getAverages, getMoodAverage };
