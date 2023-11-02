import TradingModel, { TradingData, TradingDocument } from "../models/tradings.js";

class TradingService {
  async getAllTrading(userId: string): Promise<any[]> {
    const allTrading = await TradingModel.find({ userId }).sort({ tradeTime: -1 });
    const tradingWithData = allTrading.map((trading) => {
      const totalAmount = trading.price * trading.quantity;
      return { ...trading.toObject(), totalAmount: totalAmount };
    });
    return tradingWithData;
  }
  async addTrading(userId: string, tradeTime: number, quantity: number, price: number, type: number): Promise<TradingDocument> {
    const tradingData = {
      userId,
      tradeTime,
      quantity,
      price,
      type,
    };
    const newTrading = new TradingModel(tradingData);
    const savedTrading = await newTrading.save();
    return savedTrading;
  }

  async updateTrading(
    userId: string,
    id: string,
    tradeTime: number,
    quantity: number,
    price: number,
    type: number
  ): Promise<TradingDocument> {
    const trading = await TradingModel.findOne({ _id: id, userId: userId });
    if (!trading) {
      throw new Error("Trading not found");
    }
    trading.tradeTime = tradeTime;
    trading.quantity = quantity;
    trading.price = price;
    trading.type = type;

    const updatedTrading = await trading.save();

    return updatedTrading;
  }

  async deleteTrading(userId: string, id: string): Promise<TradingDocument> {
    const deletedTrading = await TradingModel.findOneAndDelete({ _id: id, userId: userId });
    if (!deletedTrading) {
      throw new Error("Trading not found");
    }
    return deletedTrading;
  }
}

export default TradingService;
