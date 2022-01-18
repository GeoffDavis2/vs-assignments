import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/StateContext";

export const RequireToken = ({ children }) => {
  const { state: { token } } = useStateContext();

  return token ? children : <Navigate to="/" replace />;
}