import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/layout/context/authProvider";

const ProtectRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
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

export default ProtectRoute;
