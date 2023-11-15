import { useState, useEffect } from "react";
import ohlcvApi from "../api/ohlcv";

interface OhlcvData {
  ohlc: { x: number; y: number[] }[];
  volume: { x: number; y: number }[];
}

const useFetchOhlcvData = (token: string, period: string, coin: string): OhlcvData => {
  console.log(coin);
  const [ohlcv, setOhlcv] = useState({ ohlc: [], volume: [] });

  useEffect(() => {
    const fetchOhlcvData = async () => {
      try {
        const _ohlcv = await ohlcvApi.get(token, period, coin);
        setOhlcv(_ohlcv);
      } catch (error) {
        console.error("Error fetching ohlcv data:", error);
      }
    };
    fetchOhlcvData();
  }, [token, period, coin]);

  return ohlcv;
};

export default useFetchOhlcvData;
