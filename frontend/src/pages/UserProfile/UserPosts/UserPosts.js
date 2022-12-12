import React from "react";
import styles from "./UserPosts.module.css";

export default function UserPosts(props) {
  return (
    <div className={`${styles.main_div}`}>
      <div className={`${styles.description_post}`}>
        <p>{props.description}</p>
      </div>
      <div className={`${styles.img_in_post}`}>
        <img src={`./../uploadsImgPosts/${props.img}`} alt="IMG" />
      </div>
    </div>
  );
}
