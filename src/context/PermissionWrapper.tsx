import { useContext } from "react";
import { StoreContext } from "../context/Store";

export type FallbackMode = "readOnly" | "hide";

interface PermissionWrapperProps {
  allowedRoles: string[];
  fallbackMode?: FallbackMode; // determines what to do if user isn’t allowed
  children: (readOnly: boolean) => React.ReactNode;
}

export const PermissionWrapper: React.FC<PermissionWrapperProps> = ({
  allowedRoles,
  fallbackMode = "readOnly", // default to read-only mode
  children,
}) => {
  const { user } = useContext(StoreContext);
  // Ensure userRoles is always an array
  const userRoles: string[] = user?.currentUser?.role || [];
  // Check if at least one allowed role is present in the user's roles
  const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasPermission && fallbackMode === "hide") {
    return null;
  }

  return <>{children(!hasPermission)}</>;
};
