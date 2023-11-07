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
        <div> Current Price: {price} </div>
        <div> Holdings: {holdings} </div>
        <div> Balance: {balance} </div>
        <div> Profit: {profit} </div>
      </div>
    </>
  );
};

export default TradingSummary;
