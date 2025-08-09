import { IAction, ISearch } from "../../@types/store";

/* eslint-disable react-refresh/only-export-components */
export default (state: ISearch, action: IAction) => {
  let newState = {};
  switch (action.type) {
    case "SEARCH_MRN":
      newState = {
        ...state,
        result: { ...action.payload },
      };
      break;
    case "SEARCH_MRN_SUCCESS":
      newState = {
        ...state,
        result: { ...action.payload },
      };
      break;
    case "SEARCH_MRN_FAIL":
      newState = {
        ...state,
        result: { ...action.payload },
      };
      break;
    default:
      newState = state;
  }

  return newState as ISearch;
};
