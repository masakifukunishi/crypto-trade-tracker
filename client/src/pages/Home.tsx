import { useSelector } from "react-redux";

import Header from "../components/header";
import Tab from "../components/chart/controls/tab";
import SelectCurrency from "../components/common/SelectCurrency";
import CandlestickChart from "../components/chart/CandlestickChart";
import VolumeBarChart from "../components/chart/VolumeBarChart";
import { selectCoin } from "../store/slicers/common";
import { selectChartPeriod } from "../store/slicers/chart";
import useFetchOhlcvData from "../hooks/useFetchOhlcvData";
import useFetchConstants from "../hooks/useFetchConstants";
import useFetchConfigs from "../hooks/useFetchConfigs";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-900 text-gray-50 min-h-screen py-1 px-3">
      <Header />
      Home
    </div>
  );
};

export default Home;
