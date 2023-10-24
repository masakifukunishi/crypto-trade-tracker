import { set } from "firebase/database";
import { useState } from "react";

export const useErrorHandling = (initialErrors: any) => {
  const [errors, setErrors] = useState(initialErrors);

  const handleErrors = (respErrors: any) => {
    setErrors(initialErrors);
    respErrors.forEach((respError: any) => {
      const key = respError.path;
      const value = respError.msg;
      setErrors((prev: any) => ({ ...prev, [key]: [...prev[key], value] }));
    });
  };

  return {
    errors,
    handleErrors,
  };
};
