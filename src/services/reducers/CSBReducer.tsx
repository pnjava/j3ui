import { IAction } from "../../@types/store";

/* eslint-disable react-refresh/only-export-components */
export default (state: object, action: IAction) => {
  let newState = {};
  switch (action.type) {
    case "GET_CSB":
      newState = {
        ...state,
        csb: { isLoading: true },
      };
      break;
    case "GET_CSB_SUCCESS":
      newState =
      state['csb']?.['isLoading'] === true
          ? {
            ...state,
            csb: { ...action.payload },
          }
          : { ...state };
      break;
    case "GET_CSB_FAIL":
      newState =
      state['csb']?.['isLoading'] === true
          ? {
            ...state,
            csb: { ...action.payload },
          }
          : { ...state };
      break;
    case "GET_CSBS":
      newState = {
        ...state,
        csb: { isLoading: true },
      };
      break;
    case "GET_CSBS_SUCCESS":
      newState =
      state['csb']?.['isLoading'] === true
          ? {
            ...state,
            csb: { ...action.payload },
          }
          : { ...state };
      break;
    case "GET_CSBS_FAIL":
      newState =
        state['csb']?.['isLoading'] === true
          ? {
            ...state,
            csb: { ...action.payload },
          }
          : { ...state };
      break;
    default:
      newState = state;
  }
  return newState;
};
