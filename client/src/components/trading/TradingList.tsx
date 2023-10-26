import { useSelector } from "react-redux";

import { selectConstantTrading } from "../../store/slicers/constants/trading";

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
  return (
    <table>
      <thead>
        <tr>
          <th>Price Per Coin</th>
          <th>Quantity</th>
          <th>Total Amount</th>
          <th>Trading Type</th>
          <th>Date</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TradingList;
