import { useNavigate } from "react-router-dom";

import Header from "../components/header";
import useAuth from "../hooks/useAuth";
import { login } from "../utils/auth";

const Home: React.FC = () => {
  const user = useAuth();
  const navigate = useNavigate();
  if (user) {
    navigate("/my-page");
    return null;
  }
  return (
    <div className="bg-gray-900 text-gray-50 min-h-screen py-1 px-5">
      <div className="max-w-3xl flex flex-col justify-center mx-auto h-full">
        <Header />
        <div className="mt-6 px-2">
          <h1 className="text-2xl font-bold">Manage your cryptocurrency portfolios and view insights</h1>
          <h2 className="text-xl font-bold font-bold mt-6">Features</h2>
          <div className="mt-3 mb-12">
            <h3 className="text-xl font-bold">1. Candle Stick & Volume Charts</h3>
            <div className="my-10">
              <img className="w-96" src="/landing-page/chart.svg" alt="chart" />
            </div>
            <div className="text-lg mt-5">
              You can view candlestick and volume charts of cryptocurrency for selected coins and time periods.
            </div>
          </div>
          <div className="mt-3 mb-12">
            <h3 className="text-xl font-bold">2. Manage Trading histories</h3>
            <div className="my-10">
              <img className="w-96" src="/landing-page/manage.svg" alt="manage" />
            </div>
            <div className="text-lg mt-5">You can manage your trade history.</div>
          </div>
          <div className="mt-3 mb-12">
            <h3 className="text-xl font-bold">3. View Profit and Loss</h3>
            <div className="my-10">
              <img className="w-96 " src="/landing-page/profit.svg" alt="profit" />
            </div>
            <div className="text-lg mt-5">You can view profit and loss from trades.</div>
          </div>
          <div className="mt-5 mb-10 text-center">
            <h2 className="text-xl font-semibold">Get started with Crypto Trade Tracker</h2>
            <button className="mt-5 bg-blue-500 rounded-lg py-2 w-28" onClick={login}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
