import { Request, Response } from "express";

export const addTrading = async (req: Request, res: Response): Promise<void> => {
  const { date, quantity, price, type } = req.body;
  const { user } = req;
  console.log(user);
};
