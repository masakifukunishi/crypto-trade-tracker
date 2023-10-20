import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { close } from "../../store/slicers/openedModal";
import InputText from "../forms/InputText";
import SelectBox from "../forms/SelectBox";

const AddTransaction: React.FC = () => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [transactionType, setTransactionType] = useState<number>(0);
  const [errors, setErrors] = useState({ date: [], quantity: [], price: [], transactionType: [] });

  const handleChangeQuantity = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    console.log(value);
    if (value >= 0) setQuantity(value);
  }, []);
  const handleChangePrice = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 0) setPrice(value);
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <div>Add Trading</div>
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
              handleChange={handleChangeQuantity}
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
              handleChange={handleChangePrice}
            />
          </div>
          <div className="mt-5">
            <SelectBox
              id="transactionType"
              label="Transaction Type"
              isRequired={true}
              state={transactionType}
              options={[
                { value: 1, label: "Buy" },
                { value: 2, label: "Sell" },
              ]}
              errors={errors.transactionType}
              handleChange={(e) => setTransactionType(parseInt(e.target.value))}
            />
          </div>
          <div className="flex justify-end h-8 mt-11 mb-5">
            <button type="button" className="rounded-md border border-gray-50 w-16 mr-2" onClick={() => dispatch(close())}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 rounded-md border border-blue-400 w-16" disabled={isProcessing}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
