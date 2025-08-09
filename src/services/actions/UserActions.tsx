// REST Events
interface FetchPermissionsPayload {
  role?: string;
  isLoading?: boolean;
}

interface FetchCredentialsPayload {
  role?: string;
  isLoading?: boolean;
}

export const LOGIN = (username: string) => {
  console.log(`LOGIN::username: ${username}`);
  return {
    type: "LOGIN",
    payload: { isLoading: true },
  };
};

export const LOGIN_SUCCESS = (data: object) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { isLoading: false, data },
  };
};

export const LOGIN_FAIL = (data: object) => {
  return {
    type: "LOGIN_FAIL",
    payload: { isLoading: false, data },
  };
};

export const FETCH_PERMISSIONS = (
  payload: FetchPermissionsPayload = { isLoading: true }
) => ({
  type: "FETCH_PERMISSIONS",
  payload,
});
export const FETCH_PERMISSIONS_SUCCESS = (data: object) => {
  return {
    type: "FETCH_PERMISSIONS_SUCCESS",
    payload: { isLoading: false, data },
  };
};

export const FETCH_PERMISSIONS_FAIL = (data: object) => {
  return {
    type: "FETCH_PERMISSIONS_FAIL",
    payload: { isLoading: false, data },
  };
};

export const SET_CURRENT_USER = (data: object) => {
  return {
    type: "SET_CURRENT_USER",
    payload: { isLoading: false, data },
  };
};

export const FETCH_CREDENTIALS = () => {
  return {
    type: "FETCH_CREDENTIALS",
    payload: { isLoading: true },
  };
};

export const FETCH_CREDENTIALS_SUCCESS = (data: object) => {
  return {
    type: "FETCH_CREDENTIALS_SUCCESS",
    payload: { isLoading: false, data },
  };
};

export const FETCH_CREDENTIALS_FAIL = (data: object) => {
  return {
    type: "FETCH_CREDENTIALS_FAIL",
    payload: { isLoading: false, data },
  };
};
