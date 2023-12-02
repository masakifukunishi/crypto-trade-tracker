import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

import Trading, { TradingDocument } from "../../models/tradings.js";
import { add, subtract } from "../../libs/calculations.js";
import { TRADING_CONSTANT_BUY, TRADING_CONSTANT_SELL } from "../../constants/trading.js";

const calculateHoldings = (tradingRecords: TradingDocument[]): number => {
  let holdings = 0;
  tradingRecords.forEach((trading) => {
    if (trading.type === TRADING_CONSTANT_BUY) {
      holdings = add(holdings, trading.quantity);
    } else if (trading.type === TRADING_CONSTANT_SELL) {
      holdings = subtract(holdings, trading.quantity);
    } else {
      throw new Error("Invalid trading type");
    }
  });
  return holdings;
};

const calculateNewHoldings = (holdings: number, type: number, quantity: number): number => {
  if (type === TRADING_CONSTANT_BUY) {
    return add(holdings, quantity);
  } else if (type === TRADING_CONSTANT_SELL) {
    return subtract(holdings, quantity);
  } else {
    throw new Error("Invalid trading type");
  }
};

export const validateTrading = [
  body("coin").notEmpty().withMessage("Coin is required"),
  body("tradeTime")
    .matches(/^\d{13}$/)
    .withMessage("Trade date must be a valid date"),
  body("quantity").isFloat({ min: 0 }).withMessage("Quantity must be a non-negative number"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a non-negative number"),
  body("type").isInt({ min: 1, max: 2 }).withMessage("Type must be either 1 or 2"),

  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ msg: errors.array() });
      return;
    }

    const { coin, quantity } = req.body;
    const id = req.params.id;
    const { user } = req;
    const userId = user?.uid;
    let tradingRecords;
    if (id) {
      tradingRecords = await Trading.find({
        $and: [{ _id: { $ne: id } }, { userId }, { coin }],
      });
    } else {
      tradingRecords = await Trading.find({
        coin,
        userId,
      });
    }
    const holdings = calculateHoldings(tradingRecords);

    const type = parseInt(req.body.type);
    const newHoldings = calculateNewHoldings(holdings, type, quantity);

    if (newHoldings < 0) {
      res.status(400).json({
        msg: [
          {
            type: "field",
            value: 0,
            msg: "Not enough holdings",
            path: "quantity",
            location: "body",
          },
        ],
      });
      return;
    }
    next();
  },
];
