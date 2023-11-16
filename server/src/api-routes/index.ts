import express from "express";
import firebaseAuthMiddleware from "../middleware/firebaseAuth.js";

import tradingRoutes from "./trading.js";
import constantsRoutes from "./constants.js";
import configsRouters from "./configs.js";
import ohlcvRouters from "./ohlcv.js";

const router = express.Router();

router.use("/constants", constantsRoutes);
router.use("/configs", configsRouters);
router.use("/ohlcv", ohlcvRouters);
router.use("/trading", firebaseAuthMiddleware, tradingRoutes);

export default router;
