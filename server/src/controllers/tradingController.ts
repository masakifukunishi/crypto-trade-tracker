import { Request, Response } from "express";

export const addTrading = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
};
