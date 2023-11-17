import { Schema, model, Document, Model } from "mongoose";
import { multiply } from "../libs/calculations.js";

export interface TradingDocument extends Document {
  userId: string;
  coin: string;
  price: number;
  quantity: number;
  tradeTime: number;
  type: number;
  totalAmount: number;
}

export interface TradingData {
  _id: string;
  userId: string;
  coin: string;
  price: number;
  quantity: number;
  tradeTime: string;
  type: number;
  totalAmount: number;
  __v: number;
}

const TradingsSchema = new Schema<TradingDocument>({
  userId: {
    type: String,
    required: true,
  },
  coin: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  tradeTime: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    required: true,
    enum: [1, 2],
  },
});

TradingsSchema.virtual("totalAmount").get(function (this: TradingDocument) {
  return multiply(this.price, this.quantity);
});

TradingsSchema.set("toJSON", { getters: true });

const TradingsModel: Model<TradingDocument> = model("tradings", TradingsSchema);

export default TradingsModel;
