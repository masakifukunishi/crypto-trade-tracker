import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { close, selectOpenedModal } from "../../../store/slicers/openedModal";
import { selectConstantTrading } from "../../../store/slicers/constants/trading";
import InputText from "../../forms/InputText";
import SelectBox from "../../forms/SelectBox";
import DateTime from "../../forms/DateTime";
import tradingApi from "../../../api/trading";
import useAuth from "../../../hooks/useAuth";
import { useErrorHandling } from "../../../hooks/useErrorHandling";

interface EditTradingProps {
  onSubmitSuccess: () => void;
}

const EditTrading: React.FC<EditTradingProps> = ({ onSubmitSuccess }) => {
  const user = useAuth();
  const dispatch = useDispatch();
  const constantTrading = useSelector(selectConstantTrading);
  const { param } = useSelector(selectOpenedModal);
  const [tradeTime, setTradeTime] = useState<number>(param.tradeTime);
  const [quantity, setQuantity] = useState<number>(param.quantity);
  const [price, setPrice] = useState<number>(param.price);
  const [type, setType] = useState<string>(param.type);
  const { errors, handleErrors } = useErrorHandling({ tradeTime: [], quantity: [], price: [], type: [] });

  const handleInputNumberChange = (e: React.ChangeEvent<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<number>>) => {
    const value = parseInt(e.target.value);
    if (value >= 0) setValue(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await tradingApi.edit(user.token, param._id, { tradeTime, quantity, price, type });
      onSubmitSuccess();
      dispatch(close());
    } catch (error) {
      handleErrors(error);
    }
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
          <div className="font-bold">Edit Trading</div>
          <FontAwesomeIcon icon={faXmark} size="lg" className="cursor-pointer" onClick={() => dispatch(close())} />
        </div>
        <form className="mx-7" onSubmit={handleSubmit}>
          <div className="mt-5">
            <InputText
              id="quantity"
              label="Quantity"
              isRequired={true}
              isNumber={true}
              state={quantity}
              errors={errors.quantity}
              handleChange={(e) => handleInputNumberChange(e, setQuantity)}
            />
          </div>
          <div className="mt-5">
            <InputText
              id="price"
              label="Price"
              isRequired={true}
              isNumber={true}
              state={price}
              errors={errors.price}
              handleChange={(e) => handleInputNumberChange(e, setPrice)}
            />
          </div>
          <div className="mt-5">
            <SelectBox
              id="type"
              label="Trading Type"
              isRequired={true}
              state={type}
              options={constantTrading.TRADING_TYPE}
              errors={errors.type}
              handleChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <DateTime
              id="time"
              label="Time"
              isRequired={true}
              state={tradeTime}
              errors={errors.tradeTime}
              handleChange={(value) => setTradeTime(Date.parse(value))}
            />
          </div>
          <div className="flex justify-end h-8 mt-11 mb-5">
            <button type="button" className="rounded-md border border-gray-50 w-16 mr-2" onClick={() => dispatch(close())}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 rounded-md border border-blue-400 w-16">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrading;
