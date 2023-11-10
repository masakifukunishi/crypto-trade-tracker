import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/header";
import TradingList from "../components/trading/TradingList";
import TradingSummary from "../components/trading/TradingSummary";
import AddTradingModal from "../components/trading/modals/AddTrading";
import EditTradingModal from "../components/trading/modals/EditTrading";
import DeleteTradingModal from "../components/trading/modals/DeleteTrading";
import SelectCurrency from "../components/common/SelectCurrency";
import { login, logout } from "../utils/auth";
import { selectOpenedModal, open } from "../store/slicers/openedModal";
import { selectCoin } from "../store/slicers/common";
import { ADD_TRADING, EDIT_TRADING, DELETE_TRADING } from "../consts/modal";
import useAuth from "../hooks/useAuth";
import useFetchConstants from "../hooks/useFetchConstants";
import useFetchConfigs from "../hooks/useFetchConfigs";
import tradingApi from "../api/trading";

const MyPage: React.FC = () => {
  const [tradings, setTradings] = useState([]);
  const [summary, setSummary] = useState({ price: 0, holdings: 0, balance: 0, profit: 0 });
  const user = useAuth();
  const openedModal = useSelector(selectOpenedModal);
  const dispatch = useDispatch();
  const coin = useSelector(selectCoin);
  useFetchConstants("trading");
  useFetchConfigs("kraken");
  // get all tradings
  const fetch = async () => {
    try {
      const [resTrading, resSummary] = await Promise.all([tradingApi.getAll(user.token, coin), tradingApi.getSummary(user.token, coin)]);
      setTradings(resTrading);
      setSummary(resSummary);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetch();
  }, [user, coin]);

  return (
    <div className="bg-gray-900 text-gray-50 min-h-screen py-1 px-3">
      <Header />
      <SelectCurrency />
      {user ? (
        <>
          <div>
            <button
              className="bg-blue-500 rounded-lg p-2"
              onClick={() => {
                dispatch(open({ type: ADD_TRADING }));
              }}
            >
              Add trading
            </button>
          </div>
          <TradingList tradings={tradings} />
          <TradingSummary {...summary} />
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={login}>Login</button>
        </>
      )}
      {openedModal.type === ADD_TRADING && <AddTradingModal onSubmitSuccess={fetch} />}
      {openedModal.type === EDIT_TRADING && <EditTradingModal onSubmitSuccess={fetch} />}
      {openedModal.type === DELETE_TRADING && <DeleteTradingModal onSubmitSuccess={fetch} />}
    </div>
  );
};

export default MyPage;
