// REST Events
export const GET_FACILITY = (facilityCode: string = "") => {
  const log = `GET_FACILITY::facilityCode: ${facilityCode}`;
  console.log(log);

  return {
    type: "GET_FACILITY",
    payload: { isLoading: true },
  };
};

export const GET_FACILITY_SUCCESS = (data: object) => {
  return {
    type: "GET_FACILITY_SUCCESS",
    payload: { isLoading: false, data },
  };
};

export const GET_FACILITY_FAIL = (data: object) => {
  return {
    type: "GET_FACILITY_FAIL",
    payload: { isLoading: false, data },
  };
};

export const GET_FACILITIES = () => {
  const log = `GET_FACILITIES`;
  console.log(log);

  return {
    type: "GET_FACILITIES",
    payload: { isLoading: true },
  };
};

export const GET_FACILITIES_SUCCESS = (data: object) => {
  return {
    type: "GET_FACILITIES_SUCCESS",
    payload: { isLoading: false, data },
  };
};

export const GET_FACILITIES_FAIL = (data: object) => {
  return {
    type: "GET_FACILITIES_FAIL",
    payload: { isLoading: false, data },
  };
};
