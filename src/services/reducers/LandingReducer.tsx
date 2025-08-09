import { IAction, IPlans } from "../../@types/store";

/* eslint-disable react-refresh/only-export-components */
export default (state: IPlans, action: IAction) => {
  let newState = {};
  switch (action.type) {
    case "GET_ALL_PLANS":
      newState = {
        ...state,
        plans: { isLoading: true },
      };
      break;
    case "GET_ALL_PLANS_SUCCESS":
      newState = {
        ...state,
        plans: { ...action.payload.data },
      };
      break;
    case "GET_ALL_PLANS_FAIL":
      newState = {
        ...state,
        plans: { ...action.payload },
      };
      break;
    case "SEND_EMAIL":
      newState = {
        ...state,
        email: { isLoading: true },
      };
      break;
    case "SEND_EMAIL_SUCCESS":
      newState = {
        ...state,
        email: { ...action.payload.data },
      };
      break;
    case "SEND_EMAIL_FAIL":
      newState = {
        ...state,
        email: { ...action.payload },
      };
      break;
    default:
      newState = state;
      break;
  }
  return newState as IPlans;
};
