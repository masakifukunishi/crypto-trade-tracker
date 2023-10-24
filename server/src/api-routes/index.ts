import express from "express";

import tradingRoutes from "./trading.js";

const router = express.Router();

router.use("/trading", tradingRoutes);

export default router;
