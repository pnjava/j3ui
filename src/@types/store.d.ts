import { Dispatch } from "react";
import { Individual } from "@/lib/types/Individual";
import { Plan } from "@/lib/types/Plan";
import { Training } from "@/lib/types/Training";

export interface IAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface IUser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: IUserFromPortal;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  credentials: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  permissions: any;
  AccessToken?: string;

  profile: {
    isLoading: boolean;
    data: object;
  };
}

export interface ISearch {
  result: {
    isLoading: boolean;
    data: object;
  };
}

export interface IPlans {
  plans: {
    isLoading: boolean;
    data: object;
  };
}

export interface ITrainings {
  trainings: {
    isLoading: boolean;
    trainFlag?: object;
    data: Training[];
  };
}

export interface StoreState {
  user: IUser;
  search: ISearch;
  plans: IPlans;
  trainings: ITrainings;
  currentSelection: ICurrentSelection;
  // currentUser: IUserFromPortal;
}

export interface ICurrentSelection {
  currentIndividual: Individual | null;
  currentPlan: Plan | null;
}

export type StoreContextType = {
  state: StoreState;
  user: IUser;
  search: ISearch;
  plans: IPlans;
  trainings: ITrainings;
  currentSelection: ICurrentSelection;
  UserService;
  SearchService;
  LandingService;
  RestService;
  dispatch?: Dispatch<any>;
  currentUser?: any;
};

export interface IUserFromPortal {
  csbId: string;
  /**
   * NOTE: email is used as the primary key in cognito. Transactions on DAP plans
   * are tracked by email address. email addresses are case sensitive -
   * same email with different casing = 2 different users.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  org: string;
  region: string[];
  role: string[];
  permissions?: string[];
}
