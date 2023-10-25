import TradingModel, { TradingData } from "../models/tradings.js";

class TradingService {
  async addTrading(userId: string, date: string, quantity: number, price: number, type: number): Promise<TradingData> {
    const tradingData = {
      userId,
      date,
      quantity,
      price,
      type,
    };
    const newTrading = new TradingModel(tradingData);
    const savedTrading = await newTrading.save();
    return savedTrading;
  }
}

export default TradingService;
