import { Request, Response } from "express";

import TRADING_CONSTANT from "../constants/trading.js";

export const getTradingConstants = async (_req: Request, res: Response): Promise<void> => {
  res.json(TRADING_CONSTANT);
};
