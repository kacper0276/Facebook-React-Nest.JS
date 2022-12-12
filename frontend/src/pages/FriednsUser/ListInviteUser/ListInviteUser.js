import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UseWebsiteTitle from "../../../hooks/UseWebsiteTitle";
import styles from "./ListInviteUser.module.css";
import SingleInvitedList from "./SingleInvitedList/SingleInvitedList";

export default function ListInviteUser() {
  UseWebsiteTitle("Lista zaproszeń od użytkowników");

  const location = useLocation();
  const [invitedList, setInvitedList] = useState();
  const [loading, setLoading] = useState(true);

  const fetchListInvited = async () => {
    axios
      .get(
        `http://localhost:3002/api/users/usersinvitedlist/${window.localStorage.getItem(
          "login-status"
        )}`
      )
      .then((res) => {
        console.log(res.data.invitedFriends);
        setInvitedList(res.data.invitedFriends);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchListInvited();
  }, [location]);

  return (
    <div className={`${styles.main_div}`}>
      <div className={`${styles.list_invited}`}>
        <div className={`${styles.list_invited_text}`}>Lista zaproszeń:</div>
        <hr></hr>
        <div className={`${styles.invited_list_response}`}>
          {loading ? (
            <p>Ładowanie danych</p>
          ) : invitedList.length > 0 ? (
            invitedList.map((singleInvite, key) => {
              return <SingleInvitedList key={key} {...singleInvite} />;
            })
          ) : (
            <p>Nie masz nowych zaproszeń</p>
          )}
        </div>
      </div>
    </div>
  );
}
