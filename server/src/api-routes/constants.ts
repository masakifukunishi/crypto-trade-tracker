import express from "express";

import { requestErrorHandler } from "../helpers/helper.js";
import { getTradingConstants } from "../controllers/constantsController.js";

const router = express.Router();

router.get("/trading", requestErrorHandler(getTradingConstants));

export default router;
