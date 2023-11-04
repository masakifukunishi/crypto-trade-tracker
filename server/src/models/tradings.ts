import { Schema, model, Document, Model } from "mongoose";

export interface TradingDocument extends Document {
  userId: string;
  coin: string;
  price: number;
  quantity: number;
  tradeTime: number;
  type: number;
}

export interface TradingData {
  _id: string;
  userId: string;
  coin: string;
  price: number;
  quantity: number;
  tradeTime: string;
  type: number;
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

const TradingsModel: Model<TradingDocument> = model("tradings", TradingsSchema);

export default TradingsModel;
