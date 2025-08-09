import { IAction } from "../../@types/store";
import * as RestService from "../RestService";

/* eslint-disable react-refresh/only-export-components */
export default (state: object, action: IAction) => {
  let newState = {};
  switch (action.type) {
    case "GET_FACILITY":
      newState = {
        ...state,
        facilities: { isLoading: true },
      };
      break;
    case "GET_FACILITY_SUCCESS":
      newState = {
        ...state,
        facilities: { ...action.payload },
      };
      break;
    case "GET_FACILITY_FAIL":
      newState = {
        ...state,
        facilities: { ...action.payload },
      };
      break;
    case "GET_FACILITIES":
      newState = {
        ...state,
        facilities: { isLoading: true },
      };
      break;
    case "GET_FACILITIES_SUCCESS":
      newState =
      state['facilities']?.['isLoading']
          ? {
              ...state,
              facilities: { ...action.payload },
            }
          : { ...state };
      // newState = {
      //   ...state,
      //   facilities: { ...action.payload },
      // };

      break;
    case "GET_FACILITIES_FAIL":
      newState =
        state['facilities']?.['isLoading']
          ? {
              ...state,
              facilities: { ...action.payload },
            }
          : { ...state };
      // newState = {
      //   ...state,
      //   facilities: { ...action.payload },
      // };
      break;
    default:
      newState = state;
  }
  return newState;
};
