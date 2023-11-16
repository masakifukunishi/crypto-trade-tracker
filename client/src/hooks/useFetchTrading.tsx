import { useState, useEffect } from "react";
import tradingApi from "../api/trading";

const useFetchTraingData = (token: string, coin: string): any => {
  const [tradings, setTradings] = useState([]);
  const [summary, setSummary] = useState({ price: 0, holdings: 0, balance: 0, profit: 0 });

  const fetchTrading = async () => {
    if (!token) return;
    try {
      const [resTrading, resSummary] = await Promise.all([tradingApi.getAll(token, coin), tradingApi.getSummary(token, coin)]);
      setTradings(resTrading);
      setSummary(resSummary);
    } catch (error) {
      console.error("Error fetching trading:", error);
    }
  };
  useEffect(() => {
    fetchTrading();
  }, [token, coin]);

  return { tradings, summary, fetchTrading };
};

export default useFetchTraingData;
