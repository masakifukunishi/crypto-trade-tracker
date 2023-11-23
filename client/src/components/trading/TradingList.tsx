import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { EDIT_TRADING, DELETE_TRADING } from "../../consts/modal";
import { selectConstantTrading } from "../../store/slicers/constants/trading";
import { open } from "../../store/slicers/openedModal";
import formatTimestamp from "../../utils/formatTimestamp";

interface Trading {
  _id: string;
  coin: string;
  price: number;
  quantity: number;
  totalAmount: number;
  type: number;
  tradeTime: number;
}

interface Props {
  tradings: Trading[];
}

const TradingList: React.FC<Props> = ({ tradings }) => {
  const constantTrading = useSelector(selectConstantTrading);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <h2 className="text-lg font-bold">Trading List</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-max">
          <thead>
            <tr>
              <th className="w-20 text-left font-semibold">Name</th>
              <th className="w-32 text-left font-semibold">Price</th>
              <th className="w-28 text-left font-semibold">Quantity</th>
              <th className="w-32 text-left font-semibold">Total Amount</th>
              <th className="w-20 text-left font-semibold">Type</th>
              <th className="w-48 text-left font-semibold">Time</th>
              <th className="w-20 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tradings.map((trading) => (
              <tr key={trading._id}>
                <td>{trading.coin}</td>
                <td>$ {trading.price.toLocaleString()}</td>
                <td>{trading.quantity.toLocaleString()}</td>
                <td>$ {trading.totalAmount.toLocaleString()}</td>
                <td className={`${trading.type === 1 ? "text-green-400" : "text-red-400"}`}>
                  {constantTrading.TRADING_TYPE[trading.type]}
                </td>
                <td>{formatTimestamp(trading.tradeTime)}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    size="lg"
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(
                        open({
                          type: EDIT_TRADING,
                          param: {
                            _id: trading._id,
                            coin: trading.coin,
                            price: trading.price,
                            quantity: trading.quantity,
                            totalAmount: trading.totalAmount,
                            type: trading.type,
                            tradeTime: trading.tradeTime,
                          },
                        })
                      );
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="lg"
                    className="cursor-pointer ml-2"
                    onClick={() => {
                      dispatch(
                        open({
                          type: DELETE_TRADING,
                          param: { _id: trading._id },
                        })
                      );
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TradingList;
