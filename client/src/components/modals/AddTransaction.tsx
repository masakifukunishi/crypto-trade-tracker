import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { close } from "../../store/slicers/openedModal";

const AddTransaction: React.FC = () => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [transactionType, setTransactionType] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-modal-back flex justify-center overflow-hidden"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.target === e.currentTarget && dispatch(close());
      }}
    >
      <div className="w-95% max-w-sm m-auto bg-sky-950 rounded-lg">
        <div className="flex items-center justify-between h-10 border-b px-3">
          <div>Add Todo</div>
          <FontAwesomeIcon icon={faXmark} size="lg" className="cursor-pointer" onClick={() => dispatch(close())} />
        </div>
        <form className="mx-7" onSubmit={handleSubmit}></form>
      </div>
    </div>
  );
};

export default AddTransaction;
