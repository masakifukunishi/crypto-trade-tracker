import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateTrading = [
  body("date").isISO8601().withMessage("Invalid date format"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
  body("price").isInt({ min: 0 }).withMessage("Price must be a non-negative number"),
  body("type").isInt({ min: 1, max: 2 }).withMessage("Type must be either 1 or 2"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
