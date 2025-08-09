import { useContext } from "react";
import { StoreContext } from "../context/Store";

export const usePermissions = () => {
  const { user } = useContext(StoreContext);
  const userRole = user?.permissions?.data?.groupId;

  const hasPermission = (allowedRoles: string[]): boolean => {
    return allowedRoles.includes(userRole);
  };

  return { userRole, hasPermission };
};
