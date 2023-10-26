import express from "express";

import { requestErrorHandler } from "../helpers/helper.js";
import { addTrading, updateTrading, getAllTrading } from "../controllers/tradingController.js";
import { validateTrading } from "../middleware/validations/tradingValidation.js";

const router = express.Router();

router.get("/", requestErrorHandler(getAllTrading));
router.post("/", validateTrading, requestErrorHandler(addTrading));
router.put("/", validateTrading, requestErrorHandler(updateTrading));

export default router;
