import { Training } from "@/lib/types/Training";
import { IAction, ITrainings } from "../../@types/store";
import { BreadcrumbLink } from "@/components/ui/breadcrumb";

/* eslint-disable react-refresh/only-export-components */
export default (state: ITrainings, action: IAction) => {
  let newState = {};
  switch (action.type) {
    case "GET_ALL_TRAININGS":
      newState = {
        ...state,
        trainings: { ...state.trainings, isLoading: true },
      };
      break;
    case "GET_ALL_TRAININGS_SUCCESS":
      newState = {
        ...state,
        trainings: { ...state.trainings, ...action.payload },
      };
      break;
    case "GET_ALL_TRAININGS_FAIL":
      newState = {
        ...state,
        trainings: { ...state.trainings, isLoading: false },
      };
      break;

    case "CREATE_NEW_TRAINING_REQUEST":
      newState = {
        ...state,
        trainings: {
          ...state.trainings,
          trainFlag: { ...action.payload.trainFlg },
        },
      };
      break;
    case "CREATE_NEW_TRAINING_SUCCESS":
      newState = {
        ...state,
        trainings: {
          ...state.trainings,
          // data: [
          //   ...((state.trainings?.data as Training[]) || []),
          //   action.payload.data,
          // ],
          trainFlag: { ...action.payload.trainFlg },
        },
      };
      break;
    case "CREATE_NEW_TRAINING_FAILURE":
      newState = {
        ...state,
        trainings: {
          ...state.trainings,
          trainFlag: { ...action.payload.trainFlg },
        },
      };
      break;
    case "UPDATE_TRAINING_REQUEST":
      newState = {
        ...state,
        trainings: {
          ...state.trainings,
          trainFlag: { ...action.payload.trainFlg },
        },
      };
      break;
    case "UPDATE_TRAINING_SUCCESS":
      newState = {
        ...state,
        trainings: {
          ...state.trainings,
          // data: [
          //   ...((state.trainings?.data as Training[]) || []).map(
          //     (t: Training) =>
          //       t.id === action.payload.data.id ? action.payload.data : t
          //   ),
          // ],
          trainFlag: action.payload.trainFlg,
        },
      };
      break;
    case "UPDATE_TRAINING_FAILURE":
      newState = {
        ...state,
        trainings: {
          ...state.trainings,
          trainFlag: action.payload.trainFlg,
        },
      };
      break;
    case "CLEAR_TRAIN_FLAG":
      newState = {
        ...state,
        trainings: {
          ...state.trainings,
          trainFlag: {},
        },
      };
      break;
    default:
      newState = state;
      break;
  }
  return newState as ITrainings;
};
