import TradingModel, { TradingData } from "../models/tradings.js";

class TradingService {
  async getAllTrading(userId: string): Promise<TradingData[]> {
    const allTrading = await TradingModel.find({ userId });
    const tradingWithData = allTrading.map((trading) => {
      const totalAmount = trading.price * trading.quantity;
      return { ...trading.toObject(), totalamount: totalAmount };
    });
    return tradingWithData;
  }
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
