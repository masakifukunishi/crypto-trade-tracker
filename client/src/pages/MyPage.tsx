import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/header";
import TradingList from "../components/trading/TradingList";
import AddTradingModal from "../components/trading/modals/AddTrading";
import EditTradingModal from "../components/trading/modals/EditTrading";
import DeleteTradingModal from "../components/trading/modals/DeleteTrading";
import SelectCurrency from "../components/common/SelectCurrency";
import { login, logout } from "../utils/auth";
import { selectOpenedModal, open } from "../store/slicers/openedModal";
import { selectSelectedCoin } from "../store/slicers/common";
import { ADD_TRADING, EDIT_TRADING, DELETE_TRADING } from "../consts/modal";
import useAuth from "../hooks/useAuth";
import useFetchConstants from "../hooks/useFetchConstants";
import useFetchConfigs from "../hooks/useFetchConfigs";
import tradingApi from "../api/trading";

const MyPage: React.FC = () => {
  const [tradings, setTradings] = useState([]);
  const user = useAuth();
  const openedModal = useSelector(selectOpenedModal);
  const dispatch = useDispatch();
  const selectedCoin = useSelector(selectSelectedCoin);
  useFetchConstants("trading");
  useFetchConfigs("kraken");
  // get all tradings
  const fetch = async () => {
    console.log(selectedCoin);
    const res = await tradingApi.getAll(user.token, selectedCoin);
    setTradings(res);
  };

  useEffect(() => {
    if (!user) return;
    fetch();
  }, [user, selectedCoin]);

  return (
    <div className="bg-gray-900 text-gray-50 min-h-screen py-1 px-3">
      <Header />
      <SelectCurrency isUseAll={true} />
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
