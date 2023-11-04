import { useSelector, useDispatch } from "react-redux";

import { selecKrakenConfig } from "../../store/slicers/config";
import { selectSelectedCoin, setSelectedCoin } from "../../store/slicers/common";

interface CurrencyPair {
  displayName: string;
  value: string;
}

const SelectCurrency = () => {
  const krakenConfig = useSelector(selecKrakenConfig);
  const quoteAssets = krakenConfig.quoteAssets;
  const currencyOptions = quoteAssets.map((quoteAsset: { symbol: string; altname: string }) => ({
    displayName: quoteAsset.altname,
    value: quoteAsset.symbol,
  }));

  const dispatch = useDispatch();
  const selectedCoin = useSelector(selectSelectedCoin);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(setSelectedCoin(value));
  };

  return (
    <>
      <select
        value={selectedCoin}
        onChange={handleChange}
        className="border font-semibold rounded-lg block w-full px-2 py-1.5 bg-gray-700 border-gray-600 hover:border-blue-500 focus:border-blue-500 cursor-pointer"
      >
        {currencyOptions.map((pair: CurrencyPair) => (
          <option key={pair.value} value={pair.value}>
            {pair.displayName}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectCurrency;
