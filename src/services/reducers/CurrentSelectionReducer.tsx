/* eslint-disable react-refresh/only-export-components */
import { IAction, ICurrentSelection } from "@/@types/store";

export default (
  state: ICurrentSelection,
  action: IAction
) => {
  switch (action.type) {
    case "SET_CURRENT_INDIVIDUAL":
      return {
        ...state,
        currentIndividual: action.payload,
      };
    case "SET_CURRENT_PLAN":
      return {
        ...state,
        currentPlan: action.payload,
      };
    case "CLEAR_CURRENT_INDIVIDUAL":
      return {
        ...state,
        currentIndividual: null,
      };
    case "CLEAR_CURRENT_PLAN":
      return {
        ...state,
        currentPlan: null,
      }
    default:
      return state;
  }
}
