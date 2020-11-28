import { doReport, getReport } from "../../services/reportService.js"

const showReportForm = async ({ render, session }) => {
  const user = await session.get('user')
  const report = await getReport(user.id, (new Date))

  const didMorning = !!report && (!!report.sleep_duration || !!report.sleep_quality || !!report.morning_moods)
  const didEvening = !!report && (!!report.sport_duration || !!report.study_duration || !!report.evening_moods)

  render('reporting/index.ejs', { didMorning, didEvening })
}

const showReportMorningForm = async ({ render }) => {
  render('reporting/morningReport.ejs')
}

const showReportEveningForm = async ({ render }) => {
  render('reporting/eveningReport.ejs')
}

const chooseReportType = async ({ render, request, response }) => {
  const body = request.body();
  const params = await body.value;

  const type = params.get('type');

  if (type === 'morning') {
    response.redirect('/behavior/reporting/morning')
  } else if (type === 'evening') {
    response.redirect('/behavior/reporting/evening')
  } else {
    throw Error('Unknown type of reporting')
  }
}

const postMorningReport = async ({ render, request, response, session }) => {
  const body = request.body();
  const params = await body.value;

  const sleepDuration = params.get('sleepDuration');
  const sleepQuality = params.get('sleepQuality');
  const morningMood = params.get('mood');
  const date = params.get('date');

  const user = await session.get('user')

  await doReport(user.id, date, { sleepDuration, sleepQuality, morningMood })

  response.body = "Thank you for reporting!"
}

const postEveningReport = async ({ render, request, response, session }) => {
  const body = request.body();
  const params = await body.value;

  const sportDuration = params.get('sportDuration');
  const studyDuration = params.get('studyDuration');
  const eatingRegularity = params.get('eatingRegularity');
  const eatingQuality = params.get('eatingQuality');
  const eveningMood = params.get('mood');
  const date = params.get('date');

  const user = await session.get('user')

  await doReport(user.id, date, { sportDuration, studyDuration, eatingRegularity, eatingQuality, eveningMood })

  response.body = "Thank you for reporting!"
}


export { showReportForm, showReportMorningForm, showReportEveningForm, chooseReportType, postMorningReport, postEveningReport }
