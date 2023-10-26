import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { EDIT_TRADING } from "../../consts/modal";
import { selectConstantTrading } from "../../store/slicers/constants/trading";
import { open } from "../../store/slicers/openedModal";

interface Trading {
  _id: string;
  price: number;
  quantity: number;
  totalAmount: number;
  type: string;
  date: string;
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
          <th>Price Per Coin</th>
          <th>Quantity</th>
          <th>Total Amount</th>
          <th>Trading Type</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tradings.map((trading) => (
          <tr key={trading._id}>
            <td>$ {trading.price}</td>
            <td>{trading.quantity}</td>
            <td>$ {trading.totalAmount}</td>
            <td>{constantTrading.TRADING_TYPE[trading.type]}</td>
            <td>{trading.date}</td>
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
                        price: trading.price,
                        quantity: trading.quantity,
                        totalAmount: trading.totalAmount,
                        type: trading.type,
                        date: trading.date,
                      },
                    })
                  );
                }}
              />
              <FontAwesomeIcon icon={faTrash} size="lg" className="cursor-pointer" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TradingList;