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
          <div className="mt-3">
            <TradingSummary {...summary} />
          </div>
          <div>
            <button
              className="bg-blue-500 rounded-lg px-2 py-1 mt-2"
              onClick={() => {
                dispatch(open({ type: ADD_TRADING }));
              }}
            >
              Add trading
            </button>
          </div>
          <div className="mt-5">
            <TradingList tradings={tradings} />
          </div>
          <button className="mt-4 bg-gray-500 rounded-lg text-sm px-2 py-1 mt-2" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button className="mt-4 bg-gray-500 rounded-lg text-sm px-2 py-1 mt-2" onClick={login}>
            Login
          </button>
        </>
      )}
      {openedModal.type === ADD_TRADING && <AddTradingModal onSubmitSuccess={fetchTrading} />}
      {openedModal.type === EDIT_TRADING && <EditTradingModal onSubmitSuccess={fetchTrading} />}
      {openedModal.type === DELETE_TRADING && <DeleteTradingModal onSubmitSuccess={fetchTrading} />}
    </div>
  );
};

export default MyPage;
