import config from "config";

import { KrakenConfig } from "../types/config.js";
import TradingModel, { TradingDocument } from "../models/tradings.js";
import Ohlcv from "../models/ohlcv.js";
import { add, subtract, multiply } from "../libs/calculations.js";
import { TRADING_CONSTANT_BUY, TRADING_CONSTANT_SELL } from "../constants/trading.js";

class TradingService {
  private getDefaultCoin(): string {
    const krakenConfig: KrakenConfig = config.get("kraken");
    return krakenConfig.quoteAssets[0].symbol;
  }

  async getAllTrading(userId: string, coin?: string): Promise<any[]> {
    let query: { userId: string; coin?: string } = { userId };
    query.coin = coin || this.getDefaultCoin();
    const allTrading = await TradingModel.find(query).sort({ tradeTime: -1 });
    const tradingWithData = allTrading.map((trading) => {
      const totalAmount = trading.price * trading.quantity;
      return { ...trading.toObject(), totalAmount: totalAmount };
    });
    return tradingWithData;
  }

  async getTradingSummary(userId: string, coin?: string): Promise<any> {
    let query: { userId: string; coin?: string } = { userId };
    query.coin = coin || this.getDefaultCoin();
    const allTrading = await TradingModel.find(query).sort({ tradeTime: -1 });
    let holdings = 0;
    allTrading.forEach((trading) => {
      if (trading.type === TRADING_CONSTANT_BUY) {
        holdings = add(holdings, trading.quantity);
      } else if (trading.type === TRADING_CONSTANT_SELL) {
        holdings = subtract(holdings, trading.quantity);
      } else {
        throw new Error("Invalid trading type");
      }
    });
    const OhlcvModel = Ohlcv(`ohlcv_${query.coin}_ZUSD`);
    const price = await OhlcvModel.findOne().sort({ time: -1 });
    let balance = 0;
    if (price) {
      balance = multiply(holdings, 4);
    }
    let profit = 0;
    allTrading.forEach((trading) => {
      const totalAmount = multiply(trading.price, trading.quantity);
      if (trading.type === TRADING_CONSTANT_BUY) {
        profit = subtract(profit, totalAmount);
      } else if (trading.type === TRADING_CONSTANT_SELL) {
        profit = add(profit, totalAmount);
      } else {
        throw new Error("Invalid trading type");
      }
    });
    profit = add(profit, balance);
    const tradingSummary = {
      price: price?.close,
      holdings,
      balance,
      profit,
    };
    return tradingSummary;
  }

  async addTrading(
    userId: string,
    coin: string,
    tradeTime: number,
    quantity: number,
    price: number,
    type: number
  ): Promise<TradingDocument> {
    const tradingData = {
      userId,
      coin,
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
    coin: string,
    tradeTime: number,
    quantity: number,
    price: number,
    type: number
  ): Promise<TradingDocument> {
    const trading = await TradingModel.findOne({ _id: id, userId: userId });
    if (!trading) {
      throw new Error("Trading not found");
    }
    trading.coin = coin;
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
