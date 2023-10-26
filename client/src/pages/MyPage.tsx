import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/header";
import TradingList from "../components/trading/TradingList";
import AddTradingModal from "../components/trading/modals/AddTrading";
import EditTradingModal from "../components/trading/modals/EditTrading";
import { login, logout } from "../utils/auth";
import { selectOpenedModal, open } from "../store/slicers/openedModal";
import { ADD_TRADING, EDIT_TRADING } from "../consts/modal";
import useAuth from "../hooks/useAuth";
import useFetchConstants from "../hooks/useFetchConstants";
import tradingApi from "../api/trading";

const MyPage: React.FC = () => {
  const [tradings, setTradings] = useState([]);
  const user = useAuth();
  const openedModal = useSelector(selectOpenedModal);
  const dispatch = useDispatch();
  useFetchConstants("trading");
  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const res = await tradingApi.getAll(user.token);
      console.log(res);
      setTradings(res);
    };
    fetch();
  }, [user]);
  return (
    <div className="bg-gray-900 text-gray-50 min-h-screen py-1 px-3">
      <Header />
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
      {openedModal.type === ADD_TRADING && <AddTradingModal />}
      {openedModal.type === EDIT_TRADING && <EditTradingModal />}
    </div>
  );
};

export default MyPage;
