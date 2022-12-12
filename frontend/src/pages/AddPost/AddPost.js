import React, { useState } from "react";
import styles from "./AddPost.module.css";
import UseWebsiteTitle from "../../hooks/UseWebsiteTitle";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddPost() {
  UseWebsiteTitle("Dodaj post");

  const [dataPost, setDataPost] = useState({
    title: "",
    description: "",
    img: null,
    author: window.localStorage.getItem("login-status"),
  });
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const addPost = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", dataPost.title);
    formData.append("description", dataPost.description);
    formData.append("author", dataPost.author);
    formData.append("img", dataPost.img);

    axios
      .post("http://localhost:3002/api/posts/addposts", formData)
      .then((res) => {
        if (res.data.message) {
          setError();
          setMessage(res.data.message);
        } else if (res.data.error) {
          setMessage();
          setError(res.data.error);
        }
      });
  };

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
      <form
        method="POST"
        encType="multipart/form-data"
        className={`${styles.add_post_form}`}
      >
        <div className={`${styles.form_input}`}>
          <input
            type="text"
            required
            placeholder="Tytuł posta"
            onChange={(e) =>
              setDataPost({ ...dataPost, title: e.target.value })
            }
          />
        </div>
        <div className={`${styles.form_input}`}>
          <textarea
            placeholder="Opis posta"
            style={{
              width: "250px",
              height: "150px",
            }}
            onChange={(e) =>
              setDataPost({ ...dataPost, description: e.target.value })
            }
          />
        </div>
        <div className={`${styles.form_input}`}>
          <input
            type="file"
            onChange={(e) =>
              setDataPost({ ...dataPost, img: e.target.files[0] })
            }
          />
        </div>

        <button className={`${styles.add_post_button}`} onClick={addPost}>
          Dodaj Post!
        </button>

        {error ? (
          <div className={`${styles.error_message}`}>{error}</div>
        ) : null}
        {message ? (
          <div className={`${styles.success_message}`}>{message}</div>
        ) : null}
      </form>
    </div>
  );
}
