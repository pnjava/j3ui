import { Navigate, useLocation, Outlet } from "react-router-dom";

interface AuthGuardProps {
  allowedRoles: string[];
  user?: any;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ allowedRoles, user }) => {
  const location = useLocation();

  // If no user is available, redirect to the login page.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  console.log(location.pathname, "====== location pathname");

  if (location.pathname.toLowerCase() === "/revive") {
    if (user.role.includes("DBHDS_TACTS_REVIVE_TRAINER")) {
      return (
        <Navigate
          to="/revive/trainer/trainings"
          state={{ from: location }}
          replace
        />
      );
    } else if (user.role.includes("DBHDS_TACTS_REVIVE_PROGRAM_ADMIN")) {
      return (
        <Navigate
          to="/revive/admin/trainings"
          state={{ from: location }}
          replace
        />
      );
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  // If the user has access, render the nested routes.
  return <Outlet />;
};

export default AuthGuard;
