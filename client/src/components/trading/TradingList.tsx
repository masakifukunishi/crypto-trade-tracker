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
  type: string;
  tradeTime: number;
}

interface Props {
  tradings: Trading[];
}

const TradingList: React.FC<Props> = ({ tradings }) => {
  const constantTrading = useSelector(selectConstantTrading);
  const dispatch = useDispatch();
  return (
    <table>
      <thead>
        <tr>
          <th>Coin</th>
          <th>Price Per Coin</th>
          <th>Quantity</th>
          <th>Total Amount</th>
          <th>Trading Type</th>
          <th>Time</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tradings.map((trading) => (
          <tr key={trading._id}>
            <td>{trading.coin}</td>
            <td>$ {trading.price}</td>
            <td>{trading.quantity}</td>
            <td>$ {trading.totalAmount}</td>
            <td>{constantTrading.TRADING_TYPE[trading.type]}</td>
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
                className="cursor-pointer"
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
  );
};

export default TradingList;
