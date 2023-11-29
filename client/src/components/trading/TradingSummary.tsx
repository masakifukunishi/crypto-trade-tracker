interface Props {
  price: number;
  holdings: number;
  balance: number;
  profit: number;
}

const TradingSummary: React.FC<Props> = ({ price, holdings, balance, profit }) => {
  return (
    <>
      <div>
        <div className="text-lg">
          Current Price:&nbsp;<span className="font-bold">${price.toLocaleString()}</span>{" "}
        </div>
        <div className="text-lg">
          Holdings:&nbsp;<span className="font-bold">{holdings.toLocaleString()}</span>{" "}
        </div>
        <div className="text-lg">
          Balance:&nbsp;<span className="font-bold">${balance.toLocaleString()}</span>{" "}
        </div>
        <div className="text-lg">
          {profit >= 0 ? "Profit" : "Loss"}:&nbsp;
          <span className={`font-bold ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>${Math.abs(profit).toLocaleString()}</span>{" "}
        </div>
      </div>
    </>
  );
};

export default TradingSummary;
