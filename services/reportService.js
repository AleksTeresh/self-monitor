import { executeQuery } from '../database/database.js'
import { getUser, addUser } from './userService.js'
import { keysToCamel } from '../utils/objectUtil.js'

const doReport = async(userId, date, reportData) => {
  const res = await getReport(userId, date);
  if (!res) {
    await executeQuery(`INSERT INTO reports (report_day,
                                             sleep_duration,
                                             sleep_quality,
                                             sport_duration,
                                             study_duration,
                                             eating_regularity,
                                             eating_quality,
                                             morning_mood,
                                             evening_mood,
                                             user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
                                             date,
                                             reportData.sleepDuration ,
                                             reportData.sleepQuality ,
                                             reportData.sportDuration ,
                                             reportData.studyDuration ,
                                             reportData.eatingRegularity ,
                                             reportData.eatingQuality ,
                                             reportData.morningMood ,
                                             reportData.eveningMood ,
                                             userId
                                             );
  } else {
    const combinedValues = { ...keysToCamel(res), ...reportData }
    console.log(combinedValues)
    await executeQuery(`UPDATE reports SET
      sleep_duration = $2,
      sleep_quality = $3,
      sport_duration = $4,
      study_duration = $5,
      eating_regularity = $6,
      eating_quality = $7,
      morning_mood = $8,
      evening_mood = $9
      WHERE user_id = $10 AND report_day = $1;`,
      date,
      combinedValues.sleepDuration,
      combinedValues.sleepQuality,
      combinedValues.sportDuration,
      combinedValues.studyDuration,
      combinedValues.eatingRegularity,
      combinedValues.eatingQuality,
      combinedValues.morningMood,
      combinedValues.eveningMood,
      userId)
  }
}

const getReport = async(userId, date) => {
  const res = await executeQuery("SELECT * FROM reports WHERE user_id = $1 AND report_day=$2;", userId, date);
  if (res.rowCount === 0) {
      return;
  }

  // take the first row from the results
  return res.rowsOfObjects()[0];
}

export { doReport, getReport }
