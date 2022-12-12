import styles from "./MainPage.module.css";
import React from "react";
import UseWebsiteTitle from "../../hooks/UseWebsiteTitle";

export default function MainPage() {
  UseWebsiteTitle("Strona Główna");

  return (
    <div className={`${styles.main_page}`}>
      <h1 className={`${styles.shiny_text}`}>Strona główna</h1>
    </div>
  );
}
