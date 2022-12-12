import styles from "./Header.module.css";
import React from "react";
import { useLocation } from "react-router-dom";

export default function Header({ children }) {
  const location = useLocation();

  if (
    location.pathname === "/zaloguj" ||
    location.pathname === "/zarejestruj"
  ) {
    return null;
  } else {
    return <div className={`${styles.header}`}>{children}</div>;
  }
}
