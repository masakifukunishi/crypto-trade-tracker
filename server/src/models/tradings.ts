import { Schema, model, Document, Model } from "mongoose";

export interface TradingDocument extends Document {
  userId: string;
  price: number;
  quantity: number;
  date: string;
  type: number;
}

export interface TradingData {
  userId: string;
  price: number;
  quantity: number;
  date: string;
  type: number;
}

const TradingsSchema = new Schema<TradingDocument>({
  userId: {
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
  date: {
    type: String,
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
