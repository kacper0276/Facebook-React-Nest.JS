import React from "react";
import styles from "./SingleInvitedList.module.css";
import axios from "axios";

export default function SingleInvitedList(props) {
  const addFriend = async (id) => {
    axios
      .get(
        `http://localhost:3002/api/users/addfriend/${window.localStorage.getItem(
          "login-status"
        )}/${id}`
      )
      .then((res) => {
        window.location.reload();
      });
  };

  const deleteInvite = async (id) => {
    axios
      .get(
        `http://localhost:3002/api/users/deleteinvite/${window.localStorage.getItem(
          "login-status"
        )}/${id}`
      )
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <div className={`${styles.main_div}`}>
      <div className={`${styles.username}`}>{props.login}</div>
      <div className={`${styles.accept_button}`}>
        <button
          onClick={(e) => {
            e.preventDefault();
            addFriend(props.id);
          }}
        >
          Akceptuj
        </button>
      </div>
      <div className={`${styles.delete_button}`}>
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteInvite(props.id);
          }}
        >
          Odrzuć
        </button>
      </div>
    </div>
  );
}
