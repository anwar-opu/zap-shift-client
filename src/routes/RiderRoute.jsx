import { Navigate } from "react-router";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user || role !== "rider") {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default RiderRoute;
