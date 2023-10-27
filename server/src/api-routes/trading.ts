import express from "express";

import { requestErrorHandler } from "../helpers/helper.js";
import { getAllTrading, addTrading, updateTrading, deleteTrading } from "../controllers/tradingController.js";
import { validateTrading } from "../middleware/validations/tradingValidation.js";

const router = express.Router();

router.get("/", requestErrorHandler(getAllTrading));
router.post("/", validateTrading, requestErrorHandler(addTrading));
router.put("/:id", validateTrading, requestErrorHandler(updateTrading));
router.delete("/:id", requestErrorHandler(deleteTrading));

export default router;
