import { getDevOverride } from "../utils/devUserOverride";
import * as actions from "./actions/UserActions";
import * as restService from "./RestService";
import { AxiosResponse } from "axios";

// API calls
export const fetchCredentials = async (dispatch: React.Dispatch<unknown>) => {
  dispatch(actions.FETCH_CREDENTIALS());
  // 1) dev mode override
  const devUser = getDevOverride();
  if (devUser) {
    dispatch(actions.FETCH_CREDENTIALS_SUCCESS({
      data: {
        AccessToken: "eyJraWQiOiJucVZEWFliMHk5SUs4Slp6bElMZmVSSStLSk13OVlPWUd6WCtZKzZYNnhnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4NDQ4NjRhOC0yMDExLTcwZmEtNzIwMy05YzJhOTdkZmI5NjEiLCJjb2duaXRvOmdyb3VwcyI6WyJEQkhEU19EQVBfUFJPR1JBTV9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV83d2VMR3k1SmEiLCJjbGllbnRfaWQiOiI3amJoMGFwamNtb2wwdnJsOTV2azFxMnVqNiIsIm9yaWdpbl9qdGkiOiI4NGI2M2QwZi03ODY4LTQxN2YtODQ5NS1jYmZkMzdhNzAwNjUiLCJldmVudF9pZCI6IjVkNWNmZmYxLTRjMzctNDE0MS04ZDFlLTYwMDQ0YzgzZGFlNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NDQ5ODUwMTgsImV4cCI6MTc0NDk4ODYxOCwiaWF0IjoxNzQ0OTg1MDE4LCJqdGkiOiIzMGNmYzEwZS04OWYxLTQxMjUtOWUzYi1mZWM4YzkzNjFlZTciLCJ1c2VybmFtZSI6Ijg0NDg2NGE4LTIwMTEtNzBmYS03MjAzLTljMmE5N2RmYjk2MSJ9.ELbC65aXWJkTmmGkuim6LdpjTX1Bn9tHUkpHlu2XbHD3QPZtrWzdxkB6hyW2bOfGM2k2e3MGtO666XLOf3weYq7tjAiP9ZMHTd53ZdrVAlr0mcgru0MvcP_TdruXCXETA3xi0fQ0zFtu2e-ggYK2O_7bKkcZapAu699NsaGjv80JQtlqr1AZBJUVfEor_G-SMT8WSYcI3miaApLVHLi1fbXuwbPT81npL84Knd3PHfpwt27ql_XouJmBK6Vz_I-ukTZa3sdP_znCwClu5-uPSFFFE9GXLKr9jsBDuZ_-Ypou03TAOv1LjPItAI2TK0EKTxiV_aMAqkTK6q1ZLxbzCD",
        activeGroup: devUser.role[0],
        groups: devUser.role,
        user: {
          email: devUser.email,
          family_name: devUser.lastName,
          given_name: devUser.firstName,
          "custom:region": Array.isArray(devUser.region)
            ? devUser.region[0]
            : devUser.region,
          "custom:organization": devUser.org ?? "",
          user: { ...JSON.parse(sessionStorage.getItem('User') || '{}'), role: JSON.parse(sessionStorage.getItem('Groups') || '[]') }
        }
      },
    }),
    );
    return;// skip the portal
  }
  // sync the onStateChange event with react state anytime portal state changes
  // dispatch(actions.FETCH_CREDENTIALS_SUCCESS(JSON.parse(sessionStorage.getItem('User'))));
  // if (window?.['DBHDS']?.state?.onStateChange) {
  // sync whenever DBHDS.state changes
  // window?.['DBHDS']?.state.onStateChange((dbhdsState: any) => {
  dispatch(actions.FETCH_CREDENTIALS_SUCCESS({
    AccessToken: sessionStorage.getItem('AccessToken'),
    activeGroup: "DBHDS_DAP_CSB_LIAISON",
    groups: JSON.parse(sessionStorage.getItem('Groups') || '[]'),
    user: { ...JSON.parse(sessionStorage.getItem('User') || '{}'), role: JSON.parse(sessionStorage.getItem('Groups') || '[]') }
  }));
  // });
  // }
  // do an initial sync portal state with react state
  try {
    const initialDbhdsState = {
      AccessToken: sessionStorage.getItem('AccessToken'),
      activeGroup: "DBHDS_DAP_CSB_LIAISON",
      groups: JSON.parse(sessionStorage.getItem('Groups') || '[]'),
      user: { ...JSON.parse(sessionStorage.getItem('User') || '{}'), role: JSON.parse(sessionStorage.getItem('Groups') || '[]') }
    }; // await window?.['DBHDS']?.state.getState();
    dispatch(actions.FETCH_CREDENTIALS_SUCCESS(initialDbhdsState));
  } catch (error) {
    dispatch(actions.FETCH_CREDENTIALS_FAIL({ message: "🚀 ~ FAILED getting the initialDbhdsState", error }));
  }
};

export const fetchPermissions = async (dispatch: React.Dispatch<unknown>, payload: { region: string; role: string }) => {
  dispatch(actions.FETCH_PERMISSIONS(payload));

  // Use the provided URL as the base URL.
  const HOST = `${process.env.VITE_ROLES_BASE_URL}`;
  // Build the full URL with the role query parameter.
  const response = await restService.call("GET", `${HOST}?role=${payload.role}&region=${payload.region}`);

  if (response?.status === 200) {
    const successPayload = { ...response.data, ...payload };
    dispatch(actions.FETCH_PERMISSIONS_SUCCESS(successPayload));
  } else if (response?.error) {
    dispatch(actions.FETCH_PERMISSIONS_FAIL(response.error));
  }
};

