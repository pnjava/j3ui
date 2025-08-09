/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { StoreContext } from '../context/Store';
import { IUserFromPortal } from '../@types/store';
import * as UserService from '../services/UserService';
import { getDevOverride, setDevOverride } from '../utils/devUserOverride';
import { Button } from "../components/ui/button";
import { outlineButtonClasses } from './custom-ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown';
import {
  LandPlot,
  IdCard,
  SquareUserRound,
  LogOut,
  UserRoundCog,
  Earth
} from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const regionOptions = ["1", "2", "3.a"];

const roleOptions = [
  "DBHDS_DAP_CSB_LIAISON",
  "DBHDS_DAP_RM",
  "DBHDS_DAP_CSB_DAP_COORDINATOR",
  "DBHDS_DAP_CTS",
  "DBHDS_DAP_PROGRAM_ADMIN",
  "DBHDS_DAP_PROGRAM_ASSISTANT",
  "DBHDS_DAP_HSW",
  "DBHDS_DAP_HOUSING_COORDINATOR"
];

const navOptions = [
  { title: "Housing Referral Report",       to: "/dap/housing-referral-report" },
  { title: "IDAPP Landing",                 to: "/dap/idapp-landing" },
  { title: "Housing Census Search",         to: "/dap/housing-census-search" },
  { title: "DAP Administration",            to: "/dap/dap-admin" },
  { title: "Housing Create Individual",     to: "/dap/housing-create-individual" },
  { title: "IDAPP Summary Report",          to: "/dap/idapp-summary-report" },
  { title: "Housing Census Summary Report", to: "/dap/housing-census-summary-report" },
  { title: "IDAPP Search",                  to: "/dap/idapp-search" },
]

export const DebugMenu: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { pathname } = useLocation();

  const userList: IUserFromPortal[] = useMemo(() => {
    const raw = state.user.permissions?.data ?? {};
    const arr = Array.isArray(raw) ? raw : Object.values(raw);
    return arr.filter(
      (u): u is IUserFromPortal =>
        !!u && typeof u === 'object' && 'email' in u && u.email,
    );
  }, [state.user.permissions?.data]);

  const saved = getDevOverride();
  const [override, setOverride] = useState<IUserFromPortal | null>(saved);
  const [region, setRegion] = useState<string>(
    saved?.region ? (Array.isArray(saved.region) ? saved.region[0] : saved.region) : regionOptions[0],
  );
  const [role, setRole] = useState<string>(saved?.role?.[0] ?? roleOptions[0]);
  const [open, setOpen] = useState(false);

  const isLocal =false;
  //typeof window !== 'undefined' &&
  ///^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);

  if (process.env.NODE_ENV !== 'development' || !isLocal) return null;

  useEffect(() => {
    setOverride(null);
    setDevOverride(null);
    UserService.fetchPermissions(dispatch, { region, role });
    UserService.fetchCredentials(dispatch);
  }, [region, role, dispatch]);

  useEffect(() => {
    if (!override && userList.length) {
      applyOverride(userList[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userList]);

  const applyOverride = (u: IUserFromPortal) => {
    const full: IUserFromPortal = {
      ...u,
      region: [region],
      role: [role],
    };
    setOverride(full);
    setDevOverride(full);

    dispatch({
      type: 'FETCH_CREDENTIALS_SUCCESS',
      payload: {
        isLoading: false,
        data: {
          AccessToken: 'dev-token',
          activeGroup: role,
          groups: [role],
          user: {
            email: full.email,
            given_name: full.firstName,
            family_name: full.lastName,
            'custom:region': region,
            'custom:organization': full.org ?? '',
          },
        },
      },
    });
    dispatch({
      type: "SET_CURRENT_USER",
      payload: full,
    });
  };

  useEffect(() => {
    return () => {
      if (document.activeElement instanceof HTMLElement) {
        // Blurring on unmount means if something was still listening for focusin/focusout,
        // i.e. fileUploader, the active element is gone.
        document.activeElement.blur();
      }
    };
  }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {!open && (
          <Button
            size="icon"
            variant="outline"
            className={`fixed top-4 right-4 z-[9999]`}
            aria-label="open debug menu"
          >
            <UserRoundCog />
          </Button>
        )}
      </SheetTrigger>

      <SheetContent aria-describedby={undefined} side="right"
        className="w-72 p-4 space-y-6 border-dashed border-8 border-red-600 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-base mt-5">DEBUG MENU</SheetTitle>
        </SheetHeader>

        <div className="flex-1 flex flex-col gap-6 overflow-y-auto">

        <div className="flex items-center gap-3">
          {/** navigation (from portal) */}
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"
                  className={outlineButtonClasses}>
                  <Earth size={18} />
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {navOptions.map(({ title, to}) => {
                  const isActive = pathname === to;
                  return (
                  <DropdownMenuItem
                    key={to}
                    className={cn(
                      "px-4 py-2 hover:bg-gray-100",
                      isActive && "bg-blue-500 text-white"
                    )}
                    >
                      <Link
                        to={to}
                        className={cn(
                          "w-full block",
                          isActive ? "font-semibold" : "font-normal"
                        )}
                      >{title}
                      </Link>
                  </DropdownMenuItem>
                );
              })}
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          {/* region */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"
                  className={outlineButtonClasses}>
                  <LandPlot size={18} />
                  Region {region}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {regionOptions.map((r) => (
                  <DropdownMenuItem key={r} onClick={() => setRegion(r)}>
                    {r}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* role */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"
                  className={outlineButtonClasses}>
                  <IdCard size={18} />
                  {role.replace(/^DBHDS_DAP_/, '')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {roleOptions.map((r) => (
                  <DropdownMenuItem key={r} onClick={() => setRole(r)}>
                    {r.replace(/^DBHDS_DAP_/, '')}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* user */}
          {userList.length > 0 && (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline"
                    className={outlineButtonClasses}>
                    <SquareUserRound size={18} />
                    {override
                      ? `${override.firstName} ${override.lastName}`
                      : `User (${userList.length})`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-60 overflow-y-auto">
                  {userList.map((u) => (
                    <DropdownMenuItem key={u.email} onClick={() => applyOverride(u)}>
                      {u.firstName} {u.lastName}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>


        <SheetFooter>
          <Button
            variant="ghost"
            className={`w-full ${outlineButtonClasses}`}
            onClick={() => {
              setOverride(null);
              setDevOverride(null);
              localStorage.removeItem("dap.devUser");
              sessionStorage.removeItem("dap-session");
              window.location.reload();
            }}
          >
            <LogOut size={16} className="mr-2" />
            clear & reload
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
