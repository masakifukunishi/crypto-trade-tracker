import { useSelector } from "react-redux";

import Header from "../components/header";
import Tab from "../components/chart/controls/tab";
import SelectCurrency from "../components/common/SelectCurrency";
import CandlestickChart from "../components/chart/CandlestickChart";
import VolumeBarChart from "../components/chart/VolumeBarChart";
import { selectCoin } from "../store/slicers/common";
import { selectChartPeriod } from "../store/slicers/chart";
import useAuth from "../hooks/useAuth";
import useFetchOhlcvData from "../hooks/useFetchOhlcvData";
import useFetchConstants from "../hooks/useFetchConstants";
import useFetchConfigs from "../hooks/useFetchConfigs";

const Home: React.FC = () => {
  const period = useSelector(selectChartPeriod);
  const coin = useSelector(selectCoin);
  const user = useAuth();

  const ohlcv = useFetchOhlcvData(user?.token, period, coin);
  useFetchConstants("chart");
  useFetchConfigs("kraken");
  return (
    <div className="bg-gray-900 text-gray-50 min-h-screen py-1 px-3">
      <Header />
      <SelectCurrency />
      <Tab />
      {/* This color and font designation is for tooltips */}
      <div className="text-gray-900 text-sm">
        <CandlestickChart ohlc={ohlcv.ohlc} trades={ohlcv.trades} />
        <VolumeBarChart data={ohlcv.volume} />
      </div>
    </div>
  );
};

export default Home;
