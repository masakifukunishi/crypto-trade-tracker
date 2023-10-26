import express from "express";
import firebaseAuthMiddleware from "../middleware/firebaseAuth.js";

import tradingRoutes from "./trading.js";
import constantsRoutes from "./constants.js";

const router = express.Router();

router.use("/constants", constantsRoutes);
router.use("/trading", firebaseAuthMiddleware, tradingRoutes);

export default router;
