import express from "express";

import { requestErrorHandler } from "../helpers/helper.js";
import { addTrading } from "../controllers/tradingController.js";

const router = express.Router();

router.post("/", requestErrorHandler(addTrading));

export default router;
