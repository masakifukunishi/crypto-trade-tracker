import { useState, useEffect } from "react";
import ohlcvApi from "../api/ohlcv";

interface OhlcvData {
  ohlc: { x: number; y: number[] }[];
  volume: { x: number; y: number }[];
}

const useFetchOhlcvData = (token: string, period: string, coin: string): OhlcvData => {
  const [ohlcv, setOhlcv] = useState({ ohlc: [], volume: [] });

  useEffect(() => {
    const fetchOhlcvData = async () => {
      console.log("useFetchOhlcvData: token, period, coin", period, coin);
      try {
        const _ohlcv = await ohlcvApi.get(token, period, coin);
        console.log("useFetchOhlcvData: _ohlcv", _ohlcv);
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
