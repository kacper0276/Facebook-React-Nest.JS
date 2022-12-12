import React, { useEffect, useState } from "react";
import styles from "./PostsList.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UseWebsiteTitle from "../../hooks/UseWebsiteTitle";

export default function PostsList() {
  UseWebsiteTitle("Edycja postów użytkownika");

  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    axios
      .get(
        `http://localhost:3002/api/posts/getuserspost/${window.localStorage.getItem(
          "login-status"
        )}`
      )
      .then((res) => {
        setPosts(res.data.userPosts);
        setLoading(false);
      });
  };

  const deletePost = async (id) => {
    axios
      .get(`http://localhost:3002/api/posts/deletepost/${id}`)
      .then((res) => {
        fetchPosts();
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [location]);

  return (
    <div className={`${styles.main_div}`}>
      <Link to="/paneluzytkownika" className={`${styles.array}`}>
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
      {loading ? (
        <div>
          <p>Ładowanie danych...</p>
        </div>
      ) : posts.length > 0 ? (
        <table className={`${styles.table_edit}`}>
          <thead>
            <tr>
              <th>Lp.</th>
              <th>Nazwa posta</th>
              <th>Treść posta</th>
              <th>Usuń</th>
              <th>Edytuj</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>
                    <button
                      className={`${styles.delete_button}`}
                      onClick={() => deletePost(`${post.id}`)}
                    >
                      Usuń
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${styles.edit_button}`}
                      onClick={() =>
                        navigate("/paneluzytkownika/listapostow/edytuj", {
                          state: {
                            id: post.id,
                          },
                        })
                      }
                    >
                      Edytuj
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>
          <p>Brak postów do edycji</p>
        </div>
      )}
    </div>
  );
}
