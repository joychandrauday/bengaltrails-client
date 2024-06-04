import React, { useContext } from "react";
import useAdmin from "../../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";

const AdminRoute = ({children}) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user,loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return (
    <Navigate to={"/sign-in"} state={{ from: location }} replace></Navigate>
  );
};

export default AdminRoute;
