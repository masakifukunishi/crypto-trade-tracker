import { memo } from "react";

import ErrorMessage from "./ErrorMessage";

type Props = {
  id?: string;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isNumber?: boolean;
  maxLength?: number;
  state: string | number;
  errors?: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: () => void;
  handleBlur?: () => void;
};

const InputText: React.FC<Props> = memo(
  ({ id = "", label = "", placeholder = "", isRequired = false, isNumber = false, maxLength = 100, state, errors = [], handleChange }) => {
    return (
      <>
        {label && (
          <label htmlFor={id} className="text-sm ml-0.5 text-gray-200">
            {label}
            {isRequired && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <input
          autoComplete="off"
          className="w-full bg-transparent focus:outline-none border-b-2 pl-0.5 pb-1 focus:border-sky-300"
          id={id}
          type={isNumber ? "number" : "text"}
          placeholder={placeholder}
          maxLength={maxLength}
          value={state + ""}
          onChange={handleChange}
        />
        <ErrorMessage errors={errors}></ErrorMessage>
      </>
    );
  }
);

export default InputText;
