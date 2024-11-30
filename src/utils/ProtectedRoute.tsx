import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  isAuth: boolean;
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
