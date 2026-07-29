import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation(); // for location
  console.log(location);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
