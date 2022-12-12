import { Navigate } from "react-router-dom";
import React from "react";

export default function AuthenticatedRoute({ children }) {
  const auth = window.localStorage.getItem("login-status");

  if (auth) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
