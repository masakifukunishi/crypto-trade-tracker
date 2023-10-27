import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { close, selectOpenedModal } from "../../../store/slicers/openedModal";
import tradingApi from "../../../api/trading";
import useAuth from "../../../hooks/useAuth";

interface DeleteTradingProps {
  onSubmitSuccess: () => void;
}

const DeleteTrading: React.FC<DeleteTradingProps> = ({ onSubmitSuccess }) => {
  const user = useAuth();
  const dispatch = useDispatch();
  const { param } = useSelector(selectOpenedModal);

  const onDeleteClick = async () => {
    await tradingApi.delete(user.token, param._id);
    onSubmitSuccess();
    dispatch(close());
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen flex bg-modal-back justify-center overflow-hidden"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.target === e.currentTarget && dispatch(close());
      }}
    >
      <div className="w-95% max-w-sm m-auto bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between h-10 border-b px-3">
          <div className="font-bold">Delete Trading</div>
          <FontAwesomeIcon icon={faXmark} size="lg" className="cursor-pointer" onClick={() => dispatch(close())} />
        </div>

        <div className="flex justify-end h-8 mt-11 mb-5">
          <button type="button" className="rounded-md border border-gray-50 w-16 mr-2" onClick={() => dispatch(close())}>
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 rounded-md border border-blue-400 w-16" onClick={onDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTrading;
