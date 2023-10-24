import TradingModel from "../models/tradings.js";

class TradingService {
  async addTrading(userId: string, date: string, quantity: number, price: number, type: number) {
    const tradingData = {
      userId,
      date,
      quantity,
      price,
      type,
    };
    const newTrading = new TradingModel(tradingData);
    try {
      const savedTrading = await newTrading.save();
      return savedTrading;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

export default TradingService;
