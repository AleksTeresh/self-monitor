import { Router } from "../deps.js";
import {
  authenticate,
  showLoginForm,
  logout
} from "./controllers/authController.js";
import {
  register,
  showRegisterForm,
} from "./controllers/userController.js";
import {
  showReportForm,
  showReportMorningForm,
  showReportEveningForm,
  chooseReportType,
  postMorningReport,
  postEveningReport
} from "./controllers/reportController.js";
import {
  showSummary,
  postSummaryQuery
} from "./controllers/summaryController.js";
import { showLandingPage } from './controllers/landingController.js'
import { getAverages, getAveragesForDay } from './apis/interUserApi.js'

const router = new Router();

router.get("/", showLandingPage);

router.get("/auth/login", showLoginForm);
router.get("/auth/registration", showRegisterForm);
router.post("/auth/logout", logout)
router.post("/auth/login", authenticate);
router.post("/auth/registration", register);

router.get("/behavior/reporting", showReportForm);
router.post("/behavior/reporting", chooseReportType);
router.get("/behavior/reporting/morning", showReportMorningForm);
router.post("/behavior/reporting/morning", postMorningReport);
router.get("/behavior/reporting/evening", showReportEveningForm);
router.post("/behavior/reporting/evening", postEveningReport);

router.get("/behavior/summary", showSummary);
router.post("/behavior/summary", postSummaryQuery);

router.get("/api/summary", getAverages);
router.get("/api/summary/:year/:month/:day", getAveragesForDay);

export { router };
