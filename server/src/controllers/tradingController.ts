import { Request, Response } from "express";
import TradingService from "../services/tradingService.js";

const tradingService = new TradingService();

export const addTrading = async (req: Request, res: Response): Promise<void> => {
  const { date, quantity, price, type } = req.body;
  const { user } = req;
  const userId = user?.uid;
  try {
    const newTrading = await tradingService.addTrading(userId, date, quantity, price, type);
    res.status(201).json(newTrading);
  } catch (error) {
    console.log(error);
  }
};
