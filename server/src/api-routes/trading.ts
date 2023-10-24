import express from "express";

import { requestErrorHandler } from "../helpers/helper.js";
import { addTrading } from "../controllers/tradingController.js";
import { validateTrading } from "../middleware/validations/tradingValidation.js";

const router = express.Router();

router.post("/", validateTrading, requestErrorHandler(addTrading));

export default router;
