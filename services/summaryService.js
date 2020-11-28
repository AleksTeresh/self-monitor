import { executeQuery } from '../database/database.js'
import { getUser, addUser } from './userService.js'
import { keysToCamel, valuesToNumber } from '../utils/objectUtil.js'

const getWeekSummary = async (userId, week, year) => {
  const res = await executeQuery(`SELECT
    AVG(sleep_duration) as avg_sleep_duration,
    AVG(sleep_quality) as avg_sleep_quality,
    AVG(sport_duration) as avg_sport_duration,
    AVG(study_duration) as avg_study_duration,
    AVG(eating_regularity) as avg_eating_regularity,
    AVG(eating_quality) as avg_quality,
    cast(SUM(morning_mood) + SUM(evening_mood) as decimal) / (COUNT(morning_mood) + COUNT(evening_mood)) as avg_mood
    FROM reports WHERE user_id = $1 AND report_day >= TO_DATE(CONCAT(cast($2 as smallint), cast($3 as smallint)), 'IYYYIW') AND report_day <= (TO_DATE(CONCAT(cast($2 as smallint), cast($3 as smallint)), 'IYYYIW') + INTERVAL '1 week')
    GROUP BY user_id;`, userId, year, week);

  if (res.rowCount === 0) {
    return;
  }

  // take the first row from the results
  return valuesToNumber(keysToCamel(res.rowsOfObjects()[0]));
}

const getMonthSummary = async (userId, from) => {
  const res = await executeQuery(`SELECT
    AVG(sleep_duration) as avg_sleep_duration,
    AVG(sleep_quality) as avg_sleep_quality,
    AVG(sport_duration) as avg_sport_duration,
    AVG(study_duration) as avg_study_duration,
    AVG(eating_regularity) as avg_eating_regularity,
    AVG(eating_quality) as avg_quality,
    cast(SUM(morning_mood) + SUM(evening_mood) as decimal) / (COUNT(morning_mood) + COUNT(evening_mood)) as avg_mood
    FROM reports WHERE user_id = $1 AND report_day >= $2 AND report_day <= ($2 + INTERVAL '1 month')
    GROUP BY user_id;`, userId, from);

  if (res.rowCount === 0) {
    return;
  }

  // take the first row from the results
  return valuesToNumber(keysToCamel(res.rowsOfObjects()[0]));
}

export { getWeekSummary, getMonthSummary }
