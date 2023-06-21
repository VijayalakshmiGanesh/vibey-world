import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

function RequiresAuth({ children }) {
  const { isUserLoggedIn } = useAuth();
  const location = useLocation();

  return isUserLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

export default RequiresAuth;
