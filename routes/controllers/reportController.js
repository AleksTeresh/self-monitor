import { doReport, getReport } from "../../services/reportService.js";
import {
  validate,
  required,
  lengthBetween,
  isEmail,
  minLength,
  minNumber,
  maxNumber,
  isNumber,
  isInt,
  isDate,
} from "../../deps.js";

const showReportForm = async ({ render, session }) => {
  const user = await session.get("user");
  const report = await getReport(user.id, new Date());

  const didMorning =
    !!report &&
    (!!report.sleep_duration ||
      !!report.sleep_quality ||
      !!report.morning_moods);
  const didEvening =
    !!report &&
    (!!report.sport_duration ||
      !!report.study_duration ||
      !!report.evening_moods);

  render("reporting/index.ejs", { didMorning, didEvening, user });
};

const getMorningReportFormDate = () => {
  return {
    sleepDuration: undefined,
    sleepQuality: undefined,
    mood: undefined,
    sleepDuration: undefined,
    errors: [],
    date: undefined,
  };
};

const showReportMorningForm = async ({ render, session }) => {
  const user = await session.get("user");
  render("reporting/morningReport.ejs", {...getMorningReportFormDate(), user});
};

const getEveningReportFormDate = () => {
  return {
    sportDuration: undefined,
    studyDuration: undefined,
    eatingRegularity: undefined,
    eatingQuality: undefined,
    mood: undefined,
    date: undefined,
    errors: []
  };
};

const showReportEveningForm = async ({ render, session }) => {
  const user = await session.get("user");
  render("reporting/eveningReport.ejs", {...getEveningReportFormDate(), user});
};

const chooseReportType = async ({ render, request, response }) => {
  const body = request.body();
  const params = await body.value;

  const type = params.get("type");

  if (type === "morning") {
    response.redirect("/behavior/reporting/morning");
  } else if (type === "evening") {
    response.redirect("/behavior/reporting/evening");
  } else {
    throw Error("Unknown type of reporting");
  }
};

const morningValidationRules = {
  sleepDuration: [required, isNumber, minNumber(0), maxNumber(24)],
  sleepQuality: [required, isInt, minNumber(1), maxNumber(5)],
  mood: [required, isInt, minNumber(1), maxNumber(5)],
  date: [required, isDate],
};

const postMorningReport = async ({ render, request, response, session }) => {
  const body = request.body();
  const params = await body.value;
  const user = await session.get("user");

  const sleepDuration =
    params.get("sleepDuration") && Number(params.get("sleepDuration"));
  const sleepQuality =
    params.get("sleepQuality") && Number(params.get("sleepQuality"));
  const morningMood = params.get("mood") && Number(params.get("mood"));
  const date = params.get("date");

  const data = { sleepDuration, sleepQuality, mood: morningMood, date, user };
  const [passes, errors] = await validate(data, morningValidationRules);

  if (!passes) {
    data.errors = errors;
    render("reporting/morningReport.ejs", data);
    return;
  }

  await doReport(user.id, date, { sleepDuration, sleepQuality, morningMood });

  response.redirect('/behavior/reporting/morning');
};

const eveningValidationRules = {
  sportDuration: [required, isNumber, minNumber(0), maxNumber(24)],
  studyDuration: [required, isNumber, minNumber(0), maxNumber(24)],
  eatingRegularity: [required, isInt, minNumber(1), maxNumber(5)],
  eatingQuality: [required, isInt, minNumber(1), maxNumber(5)],
  mood: [required, isInt, minNumber(1), maxNumber(5)],
  date: [required, isDate],
};

const postEveningReport = async ({ render, request, response, session }) => {
  const body = request.body();
  const params = await body.value;

  const user = await session.get("user");

  const sportDuration =
    params.get("sportDuration") && Number(params.get("sportDuration"));
  const studyDuration =
    params.get("studyDuration") && Number(params.get("studyDuration"));
  const eatingRegularity =
    params.get("eatingRegularity") && Number(params.get("eatingRegularity"));
  const eatingQuality =
    params.get("eatingQuality") && Number(params.get("eatingQuality"));
  const eveningMood = params.get("mood") && Number(params.get("mood"));
  const date = params.get("date");

  const data = {
    sportDuration,
    studyDuration,
    eatingRegularity,
    eatingQuality,
    mood: eveningMood,
    date,
    user
  };
  const [passes, errors] = await validate(data, eveningValidationRules);

  if (!passes) {
    data.errors = errors;
    render("reporting/eveningReport.ejs", data);
    return;
  }

  await doReport(user.id, date, {
    sportDuration,
    studyDuration,
    eatingRegularity,
    eatingQuality,
    eveningMood,
  });

  response.redirect('/behavior/reporting/evening');
};

export {
  showReportForm,
  showReportMorningForm,
  showReportEveningForm,
  chooseReportType,
  postMorningReport,
  postEveningReport,
};
