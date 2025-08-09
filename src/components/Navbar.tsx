import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { StoreContext } from "../context/Store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown";
import { IUserFromPortal } from "@/@types/store";
import { fetchCredentials, fetchPermissions } from "@/services/UserService";

const regionOptions = ["1", "2", "3.a"];

const navLinks = [
  "DBHDS_DAP_CSB_LIAISON",
  "DBHDS_DAP_RM",
  "DBHDS_DAP_CSB_DAP_COORDINATOR",
  "DBHDS_DAP_CTS",
  "DBHDS_DAP_PROGRAM_ADMIN",
  "DBHDS_DAP_HSW",
  "DBHDS_DAP_HOUSING_COORDINATOR"
];

const Navbar = () => {
  const { state, dispatch, RestService } = useContext(StoreContext);
  const userStore = state.user;
  const [selectedUser, setSelectedUser] = useState<IUserFromPortal | null>(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  const initialRegion = selectedUser?.region ? (Array.isArray(selectedUser.region) ? selectedUser.region[0] : selectedUser.region) : regionOptions[0];
  const initialRole = selectedUser?.role[0] || navLinks[0];
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion);
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);

  // Retrieve the array of users (or object values)
  const userList: IUserFromPortal[] = useMemo(() => {
    const userData = userStore?.permissions?.data;
    if (Array.isArray(userData)) {
      return userData;
    }
    const rawObj = userData ?? {};
    return Object.values(rawObj).filter(
    (item) => typeof item === "object" && item !== null && item?.['email']
    );
  }, [userStore?.permissions?.data]);

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      fetchPermissions(dispatch, { region: selectedRegion, role: selectedRole });
      fetchCredentials(dispatch);
    }
  }, [selectedRegion, selectedRole, dispatch]);

  useEffect(() => {
    if (!selectedUser && userList.length > 0) {
      const firstUser = userList[0];
      setSelectedUser(firstUser);
      localStorage.setItem("currentUser", JSON.stringify(firstUser));
      dispatch({ type: "SET_CURRENT_USER", payload: firstUser });
    } else if (
      selectedUser &&
      userList.length > 0 &&
      !userList.find((user) => user.email === selectedUser.email)
    ) {
      // if the current selection is no longer in the new userList, select the first one.
      const firstUser = userList[0];
      setSelectedUser(firstUser);
      localStorage.setItem("currentUser", JSON.stringify(firstUser));
      dispatch({ type: "SET_CURRENT_USER", payload: firstUser });
    }
  }, [userList, selectedUser, dispatch]);

  // Save state changes into session storage (do not clear localStorage)
  useEffect(() => {
    console.log("state: ", state);
    RestService?.saveStateSession(state);
  }, [state, RestService]);

  const handleUserSelect = (user: IUserFromPortal) => {
    setSelectedUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    dispatch({ type: "SET_CURRENT_USER", payload: user });
  };

  return (
    <>
      <nav className="inset-x-0 top-0 z-50 bg-white dark:bg-gray-950/90 shadow-md">
        <div className="w-full max-w-[1200px] mx-auto px-4 pb-4 mt-2">
          <div className="flex items-center gap-4">
            <span>Role Selector:</span>

            {/* Region Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Region: {selectedRegion}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {regionOptions.map((rg) => (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    key={rg}
                    onClick={() => {
                      setSelectedRegion(rg);
                      setSelectedUser(null);
                      localStorage.removeItem("currentUser");
                    }}
                  >
                    {rg}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Role Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Role: {selectedRole}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {navLinks.map((role) => (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    key={role}
                    onClick={() => {
                      setSelectedRole(role);
                      setSelectedUser(null);
                      localStorage.removeItem("currentUser");
                    }}
                  >
                    {role.substring(role.indexOf("DAP_") + 4)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Dropdown */}
            {userList.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {selectedUser
                      ? `${selectedUser.firstName} ${selectedUser.lastName}`
                      : `Select a User (${userList.length})`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {userList.map((u, idx: number) => {
                    const regionLabel = Array.isArray(u.region)
                      ? u.region.join(",")
                      : u.region;
                    const label = `${u.firstName} ${u.lastName} - R${regionLabel} - ${u.role}`;
                    return (
                      <DropdownMenuItem
                        key={idx}
                        onClick={() => handleUserSelect(u)}
                      >
                        {label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
