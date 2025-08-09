export const ADD_CENSUS_INDIVIDUAL_SUCCESS = (data: object) => {
    return {
      type: "ADD_CENSUS_INDIVIDUAL_SUCCESS",
      payload: { isLoading: true, data },
    };
  };
  
  export const ADD_CENSUS_INDIVIDUAL_FAIL = (data: object) => {
    return {
      type: "ADD_CENSUS_INDIVIDUAL_FAIL",
      payload: { isLoading: false, data },
    };
  };

  export const ADD_CENSUS_INDIVIDUAL_REFERRAL_SUCCESS = (data: object) => {
    return {
      type: "ADD_CENSUS_INDIVIDUAL_REFERRAL_SUCCESS",
      payload: { isLoading: false, data },
    };
  };
  
  export const ADD_CENSUS_INDIVIDUAL_REFERRAL_FAIL = (data: object) => {
    return {
      type: "ADD_CENSUS_INDIVIDUAL_REFERRAL_FAIL",
      payload: { isLoading: false, data },
    };
  };