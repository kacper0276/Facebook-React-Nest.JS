import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./FoundedFriend.module.css";

export default function FoundedFriend(props) {
  const [friendsId, setFriendsId] = useState([]);
  const [sendedInvited, setSendedInvited] = useState([]);

  useEffect(() => {
    setFriendsId(props.userFriends[0].friendsid.split(" "));
    setSendedInvited(props.userFriends[0].invitedSended.split(" "));
  }, []);

  const sendInvited = async (id) => {
    axios
      .get(
        `http://localhost:3002/api/users/sendinvited/${window.localStorage.getItem(
          "login-status"
        )}/${id}`
      )
      .then((res) => {
        window.location.reload();
      });
  };

  const deleteFriend = async (id) => {
    axios
      .get(
        `http://localhost:3002/api/users/deletefriend/${window.localStorage.getItem(
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
        `http://localhost:3002/api/users/deleteinvitefriend/${window.localStorage.getItem(
          "login-status"
        )}/${id}`
      )
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <div className={`${styles.main_div}`}>
      <div className={`${styles.login}`}>{props.login}</div>
      <div className={`${styles.button}`}>
        {sendedInvited.filter((friendId) => +friendId === props.id).length >
        0 ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteInvite(props.id);
            }}
          >
            Anuluj
          </button>
        ) : friendsId.filter((friendId) => +friendId === props.id).length ===
            0 &&
          sendedInvited.filter((friendid) => +friendid === props.id).length ===
            0 ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              sendInvited(props.id);
            }}
          >
            Wyślij
          </button>
        ) : friendsId.filter((friendId) => +friendId === props.id).length >
          0 ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteFriend(props.id);
            }}
          >
            Usuń
          </button>
        ) : null}
      </div>
    </div>
  );
}
