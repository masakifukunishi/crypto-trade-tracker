import { useEffect } from "react";
import { useDispatch } from "react-redux";
import constantsApi from "../api/constants";
import { setConstantTrading, initializeConstantTrading } from "../store/slicers/constants/trading";
import { setConstantChart, initializeConstantChart } from "../store/slicers/constants/chart";

const useConstants = (constantType: string): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConstants = async () => {
      try {
        let _chartConstants;
        switch (constantType) {
          case "trading":
            _chartConstants = await constantsApi.getTrading();
            dispatch(setConstantTrading(_chartConstants));
            break;

          case "chart":
            _chartConstants = await constantsApi.getChart();
            dispatch(setConstantChart(_chartConstants));
            break;

          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching constants:", error);
      }
    };
    fetchConstants();
    return () => {
      dispatch(initializeConstantTrading());
      dispatch(initializeConstantChart());
    };
  }, [dispatch, constantType]);

  return;
};

export default useConstants;
