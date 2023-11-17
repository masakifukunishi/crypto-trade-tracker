import { useState, useEffect, useCallback } from "react";
import tradingApi from "../api/trading";

interface Summary {
  price: number;
  holdings: number;
  balance: number;
  profit: number;
}

interface Trading {
  _id: string;
  coin: string;
  price: number;
  quantity: number;
  totalAmount: number;
  type: number;
  tradeTime: number;
}

interface FetchDataResult {
  tradings: Trading[];
  summary: Summary;
  fetchTrading: () => Promise<void>;
}

const useFetchTraingData = (token: string, coin: string): FetchDataResult => {
  const [tradings, setTradings] = useState([]);
  const [summary, setSummary] = useState({ price: 0, holdings: 0, balance: 0, profit: 0 });

  const fetchTrading = useCallback(async () => {
    if (!token) return;
    try {
      const [resTrading, resSummary] = await Promise.all([tradingApi.getAll(token, coin), tradingApi.getSummary(token, coin)]);
      setTradings(resTrading);
      setSummary(resSummary);
    } catch (error) {
      console.error("Error fetching trading:", error);
    }
  }, [token, coin]);

  useEffect(() => {
    fetchTrading();
  }, [token, coin, fetchTrading]);

  return { tradings, summary, fetchTrading };
};

export default useFetchTraingData;
