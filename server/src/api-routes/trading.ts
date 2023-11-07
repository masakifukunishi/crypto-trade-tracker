import express from "express";

import { requestErrorHandler } from "../helpers/helper.js";
import { getAllTrading, getTradingSummary, addTrading, updateTrading, deleteTrading } from "../controllers/tradingController.js";
import { validateTrading } from "../middleware/validations/tradingValidation.js";

const router = express.Router();

router.get("/", requestErrorHandler(getAllTrading));
router.get("/summary", requestErrorHandler(getTradingSummary));
router.post("/", validateTrading, requestErrorHandler(addTrading));
router.put("/:id", validateTrading, requestErrorHandler(updateTrading));
router.delete("/:id", requestErrorHandler(deleteTrading));

export default router;
