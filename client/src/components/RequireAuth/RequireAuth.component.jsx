import { Navigate, Outlet } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout.component";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();

  return auth?.user ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RequireAuth;
