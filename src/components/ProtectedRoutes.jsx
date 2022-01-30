import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user }) => {
  //   useEffect(() => {
  //     console.log("protectedRoutes", user);
  //   }, [user]);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
