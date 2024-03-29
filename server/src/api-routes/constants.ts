import express from "express";

import { requestErrorHandler } from "../helpers/helper.js";
import { getTradingConstants, getChartConstants } from "../controllers/constantsController.js";

const router = express.Router();

router.get("/trading", requestErrorHandler(getTradingConstants));
router.get("/chart", requestErrorHandler(getChartConstants));

export default router;
