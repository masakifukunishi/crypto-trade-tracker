import { Request, Response } from "express";

import OhlcvService from "../services/ohlcvService.js";

export const getOhlcv = async (req: Request, res: Response): Promise<void> => {
  const { period, coin } = req.query;

  try {
    const ohlcvServiceInstance = new OhlcvService(period as string, coin as string);
    const formattedChartData = await ohlcvServiceInstance.getChartData();
    res.json(formattedChartData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
