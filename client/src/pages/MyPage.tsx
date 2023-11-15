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
import useFetchTrading from "../hooks/useFetchTrading";

const MyPage: React.FC = () => {
  const user = useAuth();
  const openedModal = useSelector(selectOpenedModal);
  const dispatch = useDispatch();
  const coin = useSelector(selectCoin);
  useFetchConstants("trading");
  useFetchConfigs("kraken");
  // get all tradings
  const { tradings, summary, fetchTrading } = useFetchTrading(user?.token, coin);

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
      {openedModal.type === ADD_TRADING && <AddTradingModal onSubmitSuccess={fetchTrading} />}
      {openedModal.type === EDIT_TRADING && <EditTradingModal onSubmitSuccess={fetchTrading} />}
      {openedModal.type === DELETE_TRADING && <DeleteTradingModal onSubmitSuccess={fetchTrading} />}
    </div>
  );
};

export default MyPage;
