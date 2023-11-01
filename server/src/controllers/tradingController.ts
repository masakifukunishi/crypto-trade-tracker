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
  const { tradeTime, quantity, price, type } = req.body;

  const { user } = req;
  const userId = user?.uid;
  try {
    const newTrading = await tradingService.addTrading(userId, tradeTime, quantity, price, type);
    res.status(201).json(newTrading);
  } catch (error) {
    console.log(error);
  }
};

export const updateTrading = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const { tradeTime, quantity, price, type } = req.body;
  const { user } = req;
  try {
    const updatedTrading = await tradingService.updateTrading(user.uid, id, tradeTime, quantity, price, type);
    res.status(200).json(updatedTrading);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTrading = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const { user } = req;
  try {
    const deletedTrading = await tradingService.deleteTrading(user.uid, id);
    res.status(200).json(deletedTrading);
  } catch (error) {
    console.log(error);
  }
};
