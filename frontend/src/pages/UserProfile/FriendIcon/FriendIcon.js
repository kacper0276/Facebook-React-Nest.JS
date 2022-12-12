import React from "react";
import { Link } from "react-router-dom";
import styles from "./FriendIcon.module.css";

export default function FriendIcon(props) {
  return (
    <div className={`${styles.main_div}`}>
      <Link to={`/profiluzytkownika/${props[0].login}`}>
        <div className={`${styles.user_img}`}>
          <img
            src={`./../profileImg/${props[0].profileImg}`}
            alt="Profile Img"
          />
        </div>
        <div className={`${styles.username}`}>
          <p>{props[0].login}</p>
        </div>
      </Link>
    </div>
  );
}
