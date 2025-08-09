import { IUserFromPortal } from "@/@types/store";

const LS_KEY = "dap.devUser";

export const getDevOverride = (): IUserFromPortal | null => {
  const isLocalhost =
    typeof window !== "undefined" &&
    /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);

  if (!isLocalhost) return null;

  try {
    const stored = localStorage.getItem(LS_KEY);
    return stored ? (JSON.parse(stored) as IUserFromPortal) : null;
  } catch {
    return null;
  }
};

export const setDevOverride = (user: IUserFromPortal | null) => {
  if (user) localStorage.setItem(LS_KEY, JSON.stringify(user));
  else localStorage.removeItem(LS_KEY);
};
