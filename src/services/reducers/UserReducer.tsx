import { deriveRegions } from "../../utils/regionUserMappingHelper";
import { IAction, IUser } from "../../@types/store";

/* eslint-disable react-refresh/only-export-components */
export default (state: IUser, action: IAction) => {
  let newState = {};
  switch (action.type) {
    case "LOGIN":
      newState = {
        ...state,
        profile: { isLoading: true },
      };
      break;
    case "LOGIN_SUCCESS":
      newState = {
        ...state,
        profile: { ...action.payload },
      };
      break;
    case "LOGIN_FAIL":
      newState = {
        ...state,
        profile: { ...action.payload },
      };
      break;
    case "FETCH_PERMISSIONS":
      newState = {
        ...state,
        permissions: { isLoading: true },
      };
      break;
    case "FETCH_PERMISSIONS_SUCCESS":
      newState = {
        ...state,
        permissions: { ...action.payload },
      };
      break;
    case "FETCH_PERMISSIONS_FAIL":
      newState = {
        ...state,
        permissions: { ...action.payload },
      };
      break;
    case "SET_CURRENT_USER":
      newState = {
        ...state,
        currentUser: { ...action.payload },
      };
      break;
    case "FETCH_CREDENTIALS":
      newState = {
        ...state,
        credentials: { isLoading: true },
      };
      break;
    case "FETCH_CREDENTIALS_SUCCESS": {
      const { groups, user: userInfo,AccessToken } = action.payload?.data || {};
      const {
        email,
        family_name,
        given_name,
        ["custom:organization"]: organizationName,
      } = userInfo || {};

      // 1) Derive csbId + regionId
      const { csbId, regionsId } = deriveRegions(
        groups,
        organizationName ?? ""
      );

      newState = {
        ...state,
        credentials: { ...action.payload },
        AccessToken,
        currentUser: {
          role: groups,
          email,
          lastName: family_name,
          firstName: given_name,
          csbId,
          region: regionsId,
          org: organizationName,
        },
      };
      break;
    }
    case "FETCH_CREDENTIALS_FAIL":
      newState = {
        ...state,
        credentials: { ...action.payload },
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState as IUser;
};
