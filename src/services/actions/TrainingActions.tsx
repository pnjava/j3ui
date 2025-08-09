import { types } from "node:util";

// All Trainings
export const GET_ALL_TRAININGS = () => {
  return {
    type: "GET_ALL_TRAININGS",
    payload: { isLoading: true },
  };
};

export const GET_ALL_TRAININGS_SUCCESS = (data: object) => {
  return {
    type: "GET_ALL_TRAININGS_SUCCESS",
    payload: { isLoading: false, data },
  };
};

export const GET_ALL_TRAININGS_FAIL = (data: object) => {
  return {
    type: "GET_ALL_TRAININGS_FAIL",
    payload: { isLoading: false, data },
  };
};

export const CREATE_NEW_TRAINING_REQUEST = () => {
  return {
    type: "CREATE_NEW_TRAINING_REQUEST",
    payload: { trainFlg: { type: "new", status: "req" } },
  };
};

export const CREATE_NEW_TRAINING_SUCCESS = (data: object) => {
  return {
    type: "CREATE_NEW_TRAINING_SUCCESS",
    payload: { data, trainFlg: { type: "new", status: "success" } },
  };
};

export const CREATE_NEW_TRAINING_FAILURE = (data: object) => {
  return {
    type: "CREATE_NEW_TRAINING_FAILURE",
    payload: { data, trainFlg: { type: "new", status: "failure" } },
  };
};

export const CLEAR_TRAIN_FLAG = () => {
  return {
    type: "CLEAR_TRAIN_FLAG",
    payload: { trainFlg: {} },
  };
};

export const UPDATE_TRAINING_REQUEST = () => {
  return {
    type: "UPDATE_TRAINING_REQUEST",
    payload: { trainFlg: { type: "update", status: "req" } },
  };
};

export const UPDATE_TRAINING_SUCCESS = (data: object) => {
  return {
    type: "UPDATE_TRAINING_SUCCESS",
    payload: { data, trainFlg: { type: "update", status: "success" } },
  };
};

export const UPDATE_TRAINING_FAILURE = (data: object) => {
  return {
    type: "UPDATE_TRAINING_FAILURE",
    payload: { data, trainFlg: { type: "update", status: "failure" } },
  };
};
