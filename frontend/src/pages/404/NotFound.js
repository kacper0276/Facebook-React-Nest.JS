import React from "react";
import UseWebsiteTitle from "../../hooks/UseWebsiteTitle";
import styles from "./NotFound.module.css";

export default function NotFound() {
  UseWebsiteTitle("Nie znaleziono strony");

  return (
    <div className={`${styles.main_div}`}>
      <p>Nie znaleziono strony :(</p>
    </div>
  );
}
