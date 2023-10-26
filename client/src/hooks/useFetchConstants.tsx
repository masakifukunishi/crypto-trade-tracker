import { useEffect } from "react";
import { useDispatch } from "react-redux";
import constantsApi from "../api/constants";
import { setConstantTrading, initializeConstantTrading } from "../store/slicers/constants/trading";

const useConstants = (constantType: string): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConstants = async () => {
      try {
        if (constantType === "trading") {
          const _chartConstants = await constantsApi.getTrading();
          dispatch(setConstantTrading(_chartConstants));
        }
      } catch (error) {
        console.error("Error fetching constants:", error);
      }
    };
    fetchConstants();
    return () => {
      dispatch(initializeConstantTrading());
    };
  }, [dispatch, constantType]);

  return;
};

export default useConstants;
