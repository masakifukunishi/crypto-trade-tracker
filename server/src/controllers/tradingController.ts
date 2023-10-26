import { Request, Response } from "express";
import TradingService from "../services/tradingService.js";

const tradingService = new TradingService();

export const getAllTrading = async (req: Request, res: Response): Promise<void> => {
  const { user } = req;
  const userId = user?.uid;
  try {
    const allTrading = await tradingService.getAllTrading(userId);
    res.status(200).json(allTrading);
  } catch (error) {
    console.log(error);
  }
};

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

export const updateTrading = async (req: Request, res: Response): Promise<void> => {
  const { id, date, quantity, price, type } = req.body;
  console.log(req.body);
  // try {
  //   const updatedTrading = await tradingService.updateTrading(id, date, quantity, price, type);
  //   res.status(200).json(updatedTrading);
  // } catch (error) {
  //   console.log(error);
  // }
};
