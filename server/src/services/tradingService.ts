import TradingModel, { TradingData, TradingDocument } from "../models/tradings.js";

class TradingService {
  async getAllTrading(userId: string): Promise<TradingData[]> {
    // const allTrading = await TradingModel.find({ userId });
    // const tradingWithData = allTrading.map((trading) => {
    //   const totalAmount = trading.price * trading.quantity;
    //   return { ...trading.toObject(), totalAmount: totalAmount };
    // });
    return [
      {
        _id: "111",
        userId: "111",
        price: 1,
        quantity: 2,
        date: "1",
        type: 2,
        __v: 0,
      },
      {
        _id: "222",
        userId: "222",
        price: 2,
        quantity: 1,
        date: "3",
        type: 2,
        __v: 0,
      },
      {
        _id: "333",
        userId: "333",
        price: 1,
        quantity: 1,
        date: "123131",
        type: 2,
        __v: 0,
      },
      {
        _id: "444",
        userId: "444",
        price: 1,
        quantity: 1,
        date: "1111111",
        type: 2,
        __v: 0,
      },
    ];
    // return tradingWithData;
  }
  async addTrading(userId: string, date: string, quantity: number, price: number, type: number): Promise<TradingDocument> {
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
