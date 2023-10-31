import { memo } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import ErrorMessage from "./ErrorMessage";

type Props = {
  id?: string;
  label?: string;
  isRequired?: boolean;
  state: string;
  errors?: string[];
  handleChange: (event: any) => void;
};

const DateTime: React.FC<Props> = memo(({ id = "", label = "", isRequired = false, state, errors = [], handleChange }) => {
  return (
    <div className="text-gray-900">
      {label && (
        <label htmlFor={id} className="text-sm ml-0.5 text-gray-200">
          {label}
          {isRequired && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <Datetime
        inputProps={{
          id: id,
          className: "w-full bg-transparent focus:outline-none border-b-2 pl-0.5 pb-1 focus:border-sky-300 text-gray-50",
        }}
        value={state}
        onChange={handleChange}
      />
      <ErrorMessage errors={errors}></ErrorMessage>
    </div>
  );
});

export default DateTime;
