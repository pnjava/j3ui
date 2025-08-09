// All Plans
export const GET_ALL_PLANS = () => {
  return {
    type: "GET_ALL_PLANS",
    payload: { isLoading: true },
  };
};

export const GET_ALL_PLANS_SUCCESS = (data: object) => {
  return {
    type: "GET_ALL_PLANS_SUCCESS",
    payload: { isLoading: false, data },
  };
};

export const GET_ALL_PLANS_FAIL = (data: object) => {
  return {
    type: "GET_ALL_PLANS_FAIL",
    payload: { isLoading: false, data },
  };
};

export const SEND_EMAIL = () => {
  return {
    type: "SEND_EMAIL",
    payload: { isLoading: true },
  };
};

export const SEND_EMAIL_SUCCESS = (data: object) => {
  return {
    type: "SEND_EMAIL_SUCCESS",
    payload: { isLoading: false, data },
  };
};

export const SEND_EMAIL_FAIL = (data: object) => {
  return {
    type: "SEND_EMAIL_FAIL",
    payload: { isLoading: false, data },
  };
};