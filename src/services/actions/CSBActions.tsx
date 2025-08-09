// REST Events
export const GET_CSB = (csbCode: string = "") => {
    const log = `GET_CSB::CSBCode: ${csbCode}`;
    console.log(log);
  
    return {
      type: "GET_CSB",
      payload: { isLoading: true },
    };
  };
  
  export const GET_CSB_SUCCESS = (data: object) => {
    return {
      type: "GET_CSB_SUCCESS",
      payload: { isLoading: false, data },
    };
  };
  
  export const GET_CSB_FAIL = (data: object) => {
    return {
      type: "GET_CSB_FAIL",
      payload: { isLoading: false, data },
    };
  };
  
  export const GET_CSBS = () => {
    const log = `GET_CSBS`;
    console.log(log);
  
    return {
      type: "GET_CSBS",
      payload: { isLoading: true },
    };
  };
  
  export const GET_CSBS_SUCCESS = (data: object) => {
    return {
      type: "GET_CSBS_SUCCESS",
      payload: { isLoading: false, data },
    };
  };
  
  export const GET_CSBS_FAIL = (data: object) => {
    return {
      type: "GET_CSBS_FAIL",
      payload: { isLoading: false, data },
    };
  };
  