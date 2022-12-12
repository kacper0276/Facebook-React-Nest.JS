import styles from "./Footer.module.css";
import React from "react";

export default function Footer() {
  return (
    <div className={`${styles.footer}`}>
      <p>
        Strona wykonana przez: Kacper Renkel{" "}
        <span dangerouslySetInnerHTML={{ __html: "&copy;" }} />
      </p>
    </div>
  );
}
