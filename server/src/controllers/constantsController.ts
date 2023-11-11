import { Request, Response } from "express";

import TRADING_CONSTANT from "../constants/trading.js";
import CHART_CONSTANT from "../constants/chart.js";

export const getTradingConstants = async (_req: Request, res: Response): Promise<void> => {
  res.json(TRADING_CONSTANT);
};

export const getChartConstants = async (_req: Request, res: Response): Promise<void> => {
  res.json(CHART_CONSTANT);
};
