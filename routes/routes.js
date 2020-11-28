import { Router } from "../deps.js";
import {
  authenticate,
  register,
  showLoginForm,
  showRegisterForm,
} from "./controllers/authController.js";
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

const router = new Router();

router.get("/", ({ response }) => {
  response.redirect("/behavior/reporting");
});

router.get("/auth/login", showLoginForm);
router.get("/auth/registration", showRegisterForm);
router.post("/auth/login", authenticate);
router.post("/auth/register", register);

router.get("/behavior/reporting", showReportForm);
router.post("/behavior/reporting", chooseReportType);
router.get("/behavior/reporting/morning", showReportMorningForm);
router.post("/behavior/reporting/morning", postMorningReport);
router.get("/behavior/reporting/evening", showReportEveningForm);
router.post("/behavior/reporting/evening", postEveningReport);

router.get("/behavior/summary", showSummary);
router.post("/behavior/summary", postSummaryQuery);

export { router };
