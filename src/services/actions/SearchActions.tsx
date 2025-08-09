// REST Events
export const SEARCH_MRN = (mrn: string) => {
  console.log(`DAP searching MRN: ${mrn}`);
  return {
    type: "SEARCH_MRN",
    payload: { isLoading: true },
  };
};

export const SEARCH_MRN_SUCCESS = (data: object) => {
  return {
    type: "SEARCH_MRN_SUCCESS",
    payload: { isLoading: false, data },
  };
};

export const SEARCH_MRN_FAIL = (data: object) => {
  return {
    type: "SEARCH_MRN_FAIL",
    payload: { isLoading: false, data },
  };
};
