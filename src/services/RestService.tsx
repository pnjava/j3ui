/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

type CallConfig = Omit<
  import("axios").AxiosRequestConfig,
  "url" | "method" | "data"
>;

import * as plans from "../__mock__/plans.json";
import * as trainings from "../__mock__/trainings.json";
import * as participants from "../__mock__/participants.json";

export const axiosInstance = axios.create();

// Expose a function that sets up the interceptor, returning a cleanup if desired
export function setupInterceptor() {
  const requestHandler = (config: InternalAxiosRequestConfig<any>) => {
    // Always return a new Promise to ensure older Axios versions wait for async completion.
    return new Promise<InternalAxiosRequestConfig<any>>((resolve, reject) => {
      // If there's no window or token function, just skip adding the header.
      if (!window?.AwsWafIntegration?.getToken) {
        return resolve(config);
      }
      window.AwsWafIntegration.getToken()
        .then((token) => {
          config.headers = {
            ...((config.headers ?? {}) as AxiosRequestHeaders),
            "x-aws-waf-token": token,
            "x-dbhds-user-agent": "dbhds-dap-useragent",
          } as any;
          resolve(config);
        })
        .catch(reject);
    });
  };

  const errorHandler = (error: any) => Promise.reject(error);

  // Attach to the instance
  const id = axiosInstance.interceptors.request.use(
    requestHandler,
    errorHandler
  );

  // Return a "remove" function if you need to detach later
  return () => axiosInstance.interceptors.request.eject(id);
}

const mockForms: Record<string, any> = {};
mockForms["plans"] = plans;
mockForms["trainings"] = trainings;
mockForms["participants"] = participants;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // custom middleware logic: logging, transforming error messages, etc.
    console.error("API call error: ", error);
    return Promise.reject(error);
  }
);

setupInterceptor();

const post = async (api: string, payload: object, config: CallConfig = {}) => {
  try {
    return await axiosInstance.post(api, payload, config);
  } catch (error) {
    return { error };
  }
};

const get = async (
  api: string,
  config: CallConfig = {}
): Promise<AxiosResponse<any> | { error: any }> => {
  try {
    return await axiosInstance.get(api, config);
  } catch (error) {
    return { error };
  }
};

const put = async (api: string, payload: object, config: CallConfig = {}) => {
  try {
    return await axiosInstance.put(api, payload, config);
  } catch (error) {
    return { error };
  }
};

const remove = async (api: string, config: CallConfig = {}) => {
  try {
    return await axiosInstance.delete(api, config);
  } catch (error) {
    return { error };
  }
};

const getJSON = async (jsonFile: string) => {
  try {
    return { status: 200, data: mockForms[jsonFile], error: null };
  } catch (error) {
    return { error };
  }
};

export const getMockTrainings = () => {
  return mockForms["trainings"];
};

export const getMockParticipants = () => {
  return mockForms["participants"];
};

const error = (protocol: string = "unknown") => {
  return { name: "Error", message: `bad protocol: ${protocol}` };
};

export const isLoggedIn = () => {
  return Boolean(sessionStorage.getItem("dtoken"));
};

export const setTokenHeader = () => {
  // however we add the bearer token to the header
  //token = (sessionStorage.getItem("dtoken")) ? String(sessionStorage.getItem("dtoken")) : "";
  //axiosInstance.setToken(token);
};

export const saveStateSession = (data: object) => {
  const new_data = data ? JSON.stringify(data) : JSON.stringify({});
  // console.log(`saving session state`, data);
  sessionStorage.setItem(String(process.env.VITE_SESSION_KEY), new_data);
};

export const getStateSession = () => {
  const session_state =
    sessionStorage.getItem(process.env.VITE_SESSION_KEY) || "";
  const parsed_state = session_state ? JSON.parse(session_state) : {};
  try {
    console.log(`retrieved session state: `, parsed_state);
  } catch (error) {
    console.error(`error parsing saved session ${error}`);
  }

  return parsed_state;
};

export const call = async (
  protocol: string,
  api = "",
  payload: object = {},
  jsonFile = "plans",
  config: CallConfig = {}
): Promise<any> => {
  // console.log(`rest api ${api}`);
  //const session  = getStateSession();
  const accessToken = sessionStorage.getItem("AccessToken");
  // console.log(accessToken);

  // ✅ Match all S3 regions/buckets
  const isPresignedS3Put =
    /^https:\/\/[^.]+\.s3[.-][a-z0-9-]+\.amazonaws\.com/i.test(api) &&
    ["put", "get"].includes(protocol.toLowerCase());

  config.headers = {
    ...config.headers,
    ...(isPresignedS3Put ? {} : { Authorization: accessToken ?? "" }),
  };

  switch (protocol.toLowerCase()) {
    case "post":
      return post(api, payload, config);
    case "get":
      return await get(api, config);
    case "put":
      return put(api, payload, config);
    case "delete":
      return remove(api, config);
    case "json":
      return getJSON(jsonFile);
    default:
      return error(protocol);
  }
};
