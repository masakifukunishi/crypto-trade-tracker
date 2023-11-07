import config from "config";

import { KrakenConfig } from "../types/config.js";
import TradingModel, { TradingDocument } from "../models/tradings.js";
import Ohlcv from "../models/ohlcv.js";
import { TRADING_CONSTANT_BUY, TRADING_CONSTANT_SELL } from "../constants/trading.js";

class TradingService {
  private getDefaultCoin(): string {
    const krakenConfig: KrakenConfig = config.get("kraken");
    return krakenConfig.quoteAssets[0].symbol;
  }

  async getAllTrading(userId: string, selectedCoin?: string): Promise<any[]> {
    let query: { userId: string; coin?: string } = { userId };
    query.coin = selectedCoin || this.getDefaultCoin();
    const allTrading = await TradingModel.find(query).sort({ tradeTime: -1 });
    const tradingWithData = allTrading.map((trading) => {
      const totalAmount = trading.price * trading.quantity;
      return { ...trading.toObject(), totalAmount: totalAmount };
    });
    return tradingWithData;
  }

  async getTradingSummary(userId: string, selectedCoin?: string): Promise<any> {
    let query: { userId: string; coin?: string } = { userId };
    query.coin = selectedCoin || this.getDefaultCoin();
    const allTrading = await TradingModel.find(query).sort({ tradeTime: -1 });
    let holdings = 0;
    allTrading.forEach((trading) => {
      if (trading.type === TRADING_CONSTANT_BUY) {
        holdings += trading.quantity;
      } else if (trading.type === TRADING_CONSTANT_SELL) {
        holdings -= trading.quantity;
      } else {
        throw new Error("Invalid trading type");
      }
    });
    const OhlcvModel = Ohlcv(`ohlcv_${query.coin}_ZUSD`);
    const price = await OhlcvModel.findOne({ coin: query.coin }).sort({ time: -1 });
    let balance = 0;
    if (price) {
      balance = holdings * price.close;
    }
    let profit = 0;
    if (allTrading.length > 0) {
      const firstTrading = allTrading[allTrading.length - 1];
      const lastTrading = allTrading[0];
      const firstTradingPrice = await OhlcvModel.findOne({ time: firstTrading.tradeTime }).sort({ time: -1 });
      const lastTradingPrice = await OhlcvModel.findOne({ time: lastTrading.tradeTime }).sort({ time: -1 });
      if (firstTradingPrice && lastTradingPrice) {
        const firstTradingTotalAmount = firstTradingPrice.close * firstTrading.quantity;
        const lastTradingTotalAmount = lastTradingPrice.close * lastTrading.quantity;
        profit = lastTradingTotalAmount - firstTradingTotalAmount;
      }
    }
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
