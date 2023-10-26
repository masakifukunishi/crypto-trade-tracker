import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/header";
import AddTradingModal from "../components/modals/AddTrading";
import { login, logout } from "../utils/auth";
import { selectOpenedModal, open } from "../store/slicers/openedModal";
import { ADD_TRADING } from "../consts/modal";
import useAuth from "../hooks/useAuth";
import tradingApi from "../api/trading";

const MyPage: React.FC = () => {
  const [tradings, setTradings] = useState([]);
  const user = useAuth();
  const openedModal = useSelector(selectOpenedModal);
  const dispatch = useDispatch();
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
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tradings.map((trading) => (
                <tr key={trading._id}>
                  <td>$ {trading.price}</td>
                  <td>{trading.quantity}</td>
                  <td>$ {trading.totalamount}</td>
                  <td>{trading.type}</td>
                  <td>{trading.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={login}>Login</button>
        </>
      )}
      {openedModal.type === ADD_TRADING && <AddTradingModal />}
    </div>
  );
};

export default MyPage;
