import { executeQuery } from '../database/database.js'
import { getUser, addUser } from './userService.js'

const getSummary = async (userId, from, to) => {
  const res = await executeQuery(`SELECT
    AVG(sleep_duration) as avgSleepDuration,
    AVG(sleep_quality) as avgSleepQuality,
    AVG(sport_duration) as avgSportDuration,
    AVG(study_duration) as avgStudyDuration,
    AVG(eating_regularity) as avgEatingRegularity,
    AVG(eating_quality) as avgQuality,
    cast(SUM(morning_mood) + SUM(evening_mood) as decimal) / (COUNT(morning_mood) + COUNT(evening_mood)) as avgMood
    FROM reports WHERE user_id = $1 AND report_day >= $2 AND report_day <= $3
    GROUP BY user_id;`, userId, from, to);

  if (res.rowCount === 0) {
    return;
  }

  // take the first row from the results
  return res.rowsOfObjects()[0];
}

export { getSummary }
