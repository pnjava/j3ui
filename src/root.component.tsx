import "core-js/stable";
import "regenerator-runtime/runtime";

import React, { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import * as actions from "./services/actions/UserActions";

import MainLayout from "./layouts/MainLayout";
import AuthGuard from "./components/AuthGuard";
import { StoreContext, StoreProvider } from "./context/Store";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./styles.css";
// import "./App.css";
import "./index.css";
import REVIVEHomePage from "./pages/REVIVEHomePage";
import VAPRSHomePage from "./pages/VAPRSHomePage";
import CreateTrainingPage from "./pages/CreateTrainingPage";
import UserEnrollmentPage from "./pages/UserEnrollmentPage";
import AdminManageTrainings from "./pages/AdminManageTrainings";
import AdminTrainingDetailPage from "./pages/AdminTrainingDetailPage";

const queryClient = new QueryClient();

function Root() {
  const { user, state, dispatch, RestService, UserService } =
    useContext(StoreContext);
  const currentUser = user.currentUser;
  // dispatch(actions.FETCH_CREDENTIALS_SUCCESS(currentUser));
  useEffect(() => {
    if (user?.currentUser) {
      dispatch(actions.FETCH_CREDENTIALS_SUCCESS(user.currentUser));
    }
  }, [user?.currentUser, dispatch]);

  useEffect(() => {
    if (UserService?.fetchCredentials) {
      UserService?.fetchCredentials(dispatch);
    }
  }, [UserService, dispatch]);

  useEffect(() => {
    RestService?.saveStateSession(state);
  }, [state, RestService]);

  const cttsAllowedRoles = [
    // "DBHDS_DAP_CSB_LIAISON",
    // "DBHDS_DAP_CSB_DAP_COORDINATOR",
    // "DBHDS_DAP_RM",
    // "DBHDS_DAP_HSW",
    // "DBHDS_DAP_CTS",
    // "DBHDS_DAP_PROGRAM_ADMIN",
    // "DBHDS_DAP_PROGRAM_ASSISTANT",
    // "DBHDS_DAP_SECURITY_ADMIN",
    // "DBHDS_DAP_SYSTEM_ADMIN",
    // "DBHDS_DAP_AUDITOR",
  ];

  const reviveAllowedRoles = [];
  const vaprsAllowedRoles = [];

  const housingCensusAllowedRoles = [
    // "DBHDS_DAP_HOUSING_COORDINATOR",
    // "DBHDS_DAP_PROGRAM_ADMIN",
    // "DBHDS_DAP_PROGRAM_ASSISTANT",
    // "DBHDS_DAP_CTS",
    // "DBHDS_DAP_SYSTEM_ADMIN",
    // "DBHDS_DAP_AUDITOR",
  ];

  const adminAllowedRoles = [
    // "DBHDS_DAP_PROGRAM_ADMIN",
    // "DBHDS_DAP_PROGRAM_ASSISTANT",
    // "DBHDS_DAP_SYSTEM_ADMIN",
    // "DBHDS_DAP_AUDITOR",
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "revive",
          element: (
            <AuthGuard allowedRoles={cttsAllowedRoles} user={currentUser} />
          ),
          children: [
            {
              children: [
                { path: "trainer/trainings", element: <HomePage /> },
                {
                  path: "trainer/new-training",
                  element: <CreateTrainingPage />,
                },
                {
                  path: "trainer/:trainingId/user-enrollment",
                  element: <UserEnrollmentPage />,
                },
                {
                  path: "trainer/user-enrollment",
                  element: <UserEnrollmentPage />,
                },
                {
                  path: "admin/trainings",
                  element: <AdminManageTrainings />,
                },
                {
                  path: "admin/completion-detail",
                  element: <AdminTrainingDetailPage />,
                },
                // { path: "search", element: <SearchPage /> },
              ],
            },
            { path: "*", element: <NotFoundPage /> }, // Catch-all under /ctts
          ],
        },
        {
          path: "vaprs",
          children: [
            {
              element: (
                <AuthGuard allowedRoles={cttsAllowedRoles} user={currentUser} />
              ),
              children: [
                { path: "", element: <HomePage /> },
                { path: "trainer", element: <HomePage /> },
                {
                  path: "trainer/new-training",
                  element: <CreateTrainingPage />,
                },
                {
                  path: "trainer/:trainingId/user-enrollment",
                  element: <UserEnrollmentPage />,
                },
                {
                  path: "admin",
                  element: <AdminManageTrainings />,
                },
                {
                  path: "admin/detail",
                  element: <AdminTrainingDetailPage />,
                },
                // { path: "search", element: <SearchPage /> },
              ],
            },
            { path: "*", element: <NotFoundPage /> }, // Catch-all under /ctts
          ],
        },
        { path: "*", element: <NotFoundPage /> }, // Global catch-all
      ],
    },
  ]);

  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={null}>
          <RouterProvider router={router} />
        </React.Suspense>
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default Root;
