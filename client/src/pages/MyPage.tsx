import { useDispatch, useSelector } from "react-redux";

import Header from "../components/header";
import AddTransactionModal from "../components/modals/AddTransaction";
import { login, logout } from "../utils/auth";
import { selectOpenedModal, open } from "../store/slicers/openedModal";
import { ADD_TRANSACTION } from "../consts/modal";
import useAuth from "../hooks/useAuth";

const MyPage: React.FC = () => {
  const user = useAuth();
  const openedModal = useSelector(selectOpenedModal);
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-900 text-gray-50 min-h-screen py-1 px-3">
      <Header />
      {user ? (
        <>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <div>
            <button
              className="bg-blue-500 rounded-lg p-2"
              onClick={() => {
                dispatch(open({ type: ADD_TRANSACTION }));
              }}
            >
              Add trading
            </button>
          </div>
          <button onClick={login}>Login</button>
        </>
      )}
      {openedModal.type === ADD_TRANSACTION && <AddTransactionModal />}
    </div>
  );
};

export default MyPage;
