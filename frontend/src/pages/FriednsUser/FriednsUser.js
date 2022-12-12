import axios from "axios";
import React, { useEffect, useState } from "react";
import UseWebsiteTitle from "../../hooks/UseWebsiteTitle";
import FoundedFriend from "./FoundedFriend/FoundedFriend";
import styles from "./FriednsUser.module.css";
import { useLocation } from "react-router-dom";

export default function FriednsUser() {
  UseWebsiteTitle("Dodaj/Usuń znajomych");

  const location = useLocation();
  const [searchFriend, setSearchFriend] = useState({
    search: "",
    loginUser: window.localStorage.getItem("login-status"),
  });
  const [listFoundedFriends, setListFoundedFriends] = useState([]);
  const [error, setError] = useState();
  const [userFriends, setUserFriends] = useState([]);

  const fetchUserFriend = async () => {
    axios
      .get(
        `http://localhost:3002/api/users/getuserfriend/${window.localStorage.getItem(
          "login-status"
        )}`
      )
      .then((res) => {
        if (res.data.userFriends) {
          setUserFriends(res.data.userFriends);
        }
      });
  };

  const searchFriendsFunction = async () => {
    if (searchFriend.search !== "") {
      await axios
        .post("http://localhost:3002/api/users/searchfriend", {
          searchFriend: searchFriend,
        })
        .then((res) => {
          if (res.data.findUsers) {
            setListFoundedFriends(res.data.findUsers);
            setError();
          } else if (res.data.error) {
            setError(res.data.error);
            setListFoundedFriends();
          }
        });
    } else {
      setError("Wyszukiwarka nie może być pusta");
    }
  };

  useEffect(() => {
    fetchUserFriend();
  }, [location]);

  return (
    <div className={`${styles.main_div}`}>
      <p>Edytuj listę znajomych</p>
      <form className={`${styles.form_search_friends}`}>
        <input
          type="text"
          onChange={(e) =>
            setSearchFriend({ ...searchFriend, search: e.target.value })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              searchFriendsFunction();
            }
          }}
        />
        {error ? (
          <div>{error}</div>
        ) : (
          listFoundedFriends.map((friend, key) => {
            return (
              <FoundedFriend {...friend} key={key} userFriends={userFriends} />
            );
          })
        )}
      </form>
    </div>
  );
}
