import { Navigate, useLocation } from "react-router";
import { useAuth } from "../layout/context/authProvider";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user?.isAuth) {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{ path: location.pathname }}
      />
    );
  }

  return children;
};

export default RequireAuth;