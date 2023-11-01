import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateTrading = [
  body("tradeTime")
    .matches(/^\d{13}$/)
    .withMessage("Trade date must be a valid date"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
  body("price").isInt({ min: 0 }).withMessage("Price must be a non-negative number"),
  body("type").isInt({ min: 1, max: 2 }).withMessage("Type must be either 1 or 2"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ msg: errors.array() });
      return;
    }

    next();
  },
];
