declare module "@dbhds/utilities" {
  import type { Store } from "redux";
  import type { Location } from "react-router-dom";

  export type Token = string | null;
  export function fetchJSON(
    url: string,
    fetchOptions?: RequestInit,
  ): Promise<any>;
  export function fetchCommonService(
    url: string,
    fetchOptions?: RequestInit,
  ): Promise<any>;
  export function getCurrentApp(location: Location): App;

  export type AuthenticationState = {
    accessToken: Token;
    refreshToken: Token;
    groups: string[];
    activeGroup: string | null;
  };
  export type User = {
    email: string;
    family_name: string;
    given_name: string;
    "custom:region": string;
    "custom:organization": string;
  };
  export type App = {
    app: string;
    desc: string;
    displayName: string;
    id: string;
    url: string;
  };

  export type State = {
    apps: App[];
    appsLoading: boolean;
    error: boolean;
    forUserToken: string;
  };

  export type AppAction = {
    app: string;
    desc: string;
    displayName: string;
    id: string;
    url: string;
  };
  export type AppActionsSelectorType = {
    loading: boolean;
    appActions: AppAction[];
  };

  export function AuthenticationSelector();
  export function AppsSelector();
  export function AppActionsSelector();
  export function AppActionsDispatcher();

  export interface AppsDispatcherType {
    reset: () => void;
    fetchApps: () => Promise<void> | undefined;
  }

  export function AppsDispatcher(): AppsDispatcherType;

  export function getItem(key: string): any[] | object | null;
  export function setItem(key: string, value: string): void;
  export function removeItem(key: string): void;
  export function clearAll(): void;
  export function getGroupsFromJwt(token: string): any[];

  export interface RootState {
    apps: {
      appsLoading: boolean;
      items: any[]; // Replace with your real types
    };
    auth: {
      user: string | null;
      token: string | null;
    };
  }

  export const store: Store<RootState>;
  // Add more exported types as needed
}
