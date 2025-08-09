import { createContext, useReducer } from "react";

import * as UserService from "../services/UserService";
import UserReducer from "../services/reducers/UserReducer";

import * as LandingService from "../services/LandingService";
import LandingReducer from "../services/reducers/LandingReducer";

import * as SearchService from "../services/SearchService";
import SearchReducer from "../services/reducers/SearchReducer";

import * as RestService from "../services/RestService";

import {
  StoreContextType,
  IUser,
  ISearch,
  IPlans,
  StoreState,
  ICurrentSelection,
  IUserFromPortal,
  ITrainings,
} from "../@types/store";

import CurrentSelectionReducer from "../services/reducers/CurrentSelectionReducer";
import { deriveRegions } from "../utils/regionUserMappingHelper";
import TrainingReducer from "../services/reducers/TrainingReducer";

export function combineReducers<T, A>(reducers: {
  [K in keyof T]: (sliceState: T[K], action: A) => T[K];
}) {
  return (state: T, action: A): T => {
    const newState = { ...state };
    for (const key in reducers) {
      const reducer = reducers[key];
      newState[key] = reducer(state[key], action);
    }
    return newState;
  };
}
const storeUser = { ...JSON.parse(sessionStorage.getItem("User") || "{}") };
const storeGroups = JSON.parse(sessionStorage.getItem("Groups") || "[]");
const { csbId, regionsId } = deriveRegions(
  storeGroups,
  storeUser["custom:organization"] ?? ""
);
const userInfo = {
  AccessToken: sessionStorage.getItem("AccessToken"),
  // activeGroup: "DBHDS_DAP_CSB_LIAISON",
  groups: storeGroups,
  user: storeUser,
  role: JSON.parse(sessionStorage.getItem("Groups") || "[]"),
  region: regionsId || [storeUser["custom:region"]],
  email: storeUser.email,
  lastName: storeUser.family_name,
  firstName: storeUser.given_name,
  id: storeUser.id,
  csbId: csbId,
  org: storeUser["custom:organization"],
};
// Define initial slices
const user: IUser = {
  profile: { isLoading: true, data: {} },
  permissions: {},
  credentials: {
    data: userInfo,
  },
  currentUser: { ...userInfo } as any,
};
const search: ISearch = { result: { isLoading: true, data: {} } };
const plans: IPlans = { plans: { isLoading: true, data: {} } };
const trainings: ITrainings = {
  trainings: { isLoading: true, data: [], trainFlag: {} },
};
const currentSelection: ICurrentSelection = {
  currentIndividual: null,
  currentPlan: null,
};

// Merge slices into one store object
let initialState: StoreState = {
  user,
  search,
  plans,
  currentSelection,
  trainings,
  // currentUser: undefined
};

// check session storage for any saved state
const saved_state = RestService.getStateSession();
if (saved_state) {
  initialState = { ...initialState, ...saved_state };
}

const defaultStore: StoreContextType = {
  state: initialState,
  user: initialState.user,
  search: initialState.search,
  plans: initialState.plans,
  trainings: initialState.trainings,
  currentSelection: initialState.currentSelection,

  UserService: {},
  SearchService: {},
  LandingService,
  RestService,
  dispatch: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext<StoreContextType>(defaultStore);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    combineReducers<StoreState, any>({
      user: UserReducer,
      search: SearchReducer,
      plans: LandingReducer,
      trainings: TrainingReducer,
      currentSelection: CurrentSelectionReducer,
    }),
    initialState
  );

  return (
    <StoreContext.Provider
      value={{
        state,
        user: state.user,
        search: state.search,
        plans: state.plans,
        trainings: state.trainings,
        currentSelection: state.currentSelection,
        UserService,
        SearchService,
        LandingService,
        RestService,
        dispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
