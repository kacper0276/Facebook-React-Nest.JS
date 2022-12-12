import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import UseWebsiteTitle from "../../hooks/UseWebsiteTitle";
import FriendIcon from "./FriendIcon/FriendIcon";
import styles from "./UserProfile.module.css";
import UserPosts from "./UserPosts/UserPosts";
import axios from "axios";

export default function LoggedUserProfile() {
  UseWebsiteTitle(
    `Profil użytkonika ${window.localStorage.getItem("login-status")}`
  );
  const { username } = useParams();
  const location = useLocation();
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchFriends = async () => {
    axios
      .get(`http://localhost:3002/api/users/profile/getfriends/${username}`)
      .then((res) => {
        if (res.data.listFriends) {
          setFriends(res.data.listFriends);
        }
        fetchPosts();
      });
  };

  const fetchPosts = async () => {
    axios
      .get(`http://localhost:3002/api/posts/postsinprofile/${username}`)
      .then((res) => {
        if (res.data.posts) {
          setPosts(res.data.posts);
        }
      });
  };

  useEffect(() => {
    fetchFriends();
  }, [location]);

  return (
    <div className={`${styles.main_page}`}>
      <Link to="/" className={`${styles.array}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="white"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </Link>
      <div className={`${styles.profile_template}`}>
        <div className={`${styles.username_in_template}`}>
          {username}
          <Link
            to={`/profiluzytkownika/zaproszenia/${username}`}
            className={`${styles.link_to_invited}`}
          >
            Zaproszenia
          </Link>
        </div>
        <div className={`${styles.username_friends_list}`}>
          {friends.length > 0 ? (
            friends.map((friend, key) => {
              return <FriendIcon key={key} {...friend} />;
            })
          ) : (
            <p>Brak znajomych :( </p>
          )}
        </div>
        <hr />
        <div className={`${styles.username_posts}`}>
          {posts.length > 0 ? (
            posts.map((post, key) => {
              return <UserPosts key={key} {...post} />;
            })
          ) : (
            <p>Brak postów do wyświetlenia</p>
          )}
        </div>
      </div>
    </div>
  );
}
