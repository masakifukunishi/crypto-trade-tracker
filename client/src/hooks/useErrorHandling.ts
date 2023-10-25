import { useState } from "react";

interface ValidationError {
  type: "field";
  value: number;
  msg: string;
  path: string;
  location: string;
}

interface InitialErrors {
  [key: string]: string[];
}

export const useErrorHandling = (initialErrors: InitialErrors) => {
  const [errors, setErrors] = useState(initialErrors);

  const handleErrors = (ValidationErrors: ValidationError[]) => {
    setErrors(initialErrors);
    ValidationErrors.forEach((ValidationError) => {
      const key = ValidationError.path;
      const value = ValidationError.msg;
      setErrors((prev) => ({ ...prev, [key]: [...prev[key], value] }));
    });
  };

  return {
    errors,
    handleErrors,
  };
};
