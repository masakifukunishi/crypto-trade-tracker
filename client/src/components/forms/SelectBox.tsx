import { memo } from "react";

import ErrorMessage from "./ErrorMessage";

type Props = {
  id?: string;
  label?: string;
  options: { value: string | number; label: string }[];
  isRequired?: boolean;
  state: string | number;
  errors?: string[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFocus?: () => void;
  handleBlur?: () => void;
};

const SelectBox: React.FC<Props> = memo(({ id = "", label = "", options, isRequired = false, state, errors = [], handleChange }) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="text-sm ml-0.5 text-gray-200">
          {label}
          {isRequired && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <select
        className="w-full bg-transparent focus:outline-none border-b-2 pl-0.5 pb-1 focus:border-sky-300 cursor-pointer"
        id={id}
        value={state + ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage errors={errors}></ErrorMessage>
    </>
  );
});

export default SelectBox;
