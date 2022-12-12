import React, { useState } from "react";
import styles from "./EditUserDataForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UseWebsiteTitle from "../../hooks/UseWebsiteTitle";

export default function EditUserDataForm() {
  UseWebsiteTitle("Zmiana danych użytkownika");
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    login: window.localStorage.getItem("login-status"),
    password: "",
    sec_password: "",
    img: null,
    default_name: window.localStorage.getItem("login-status"),
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const editUserData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("login", editData.login);
    formData.append("password", editData.password);
    formData.append("sec_password", editData.sec_password);
    formData.append("img", editData.img);
    formData.append("default_name", editData.default_name);

    axios
      .post("http://localhost:3002/api/users/edituser", formData)
      .then((res) => {
        if (res.data.message) {
          setSuccess(res.data.message);
          setError();
          if (res.data.message === "Zmieniono login oraz hasło") {
            window.localStorage.removeItem("login-status");
            navigate("/");
          }
        } else if (res.data.error) {
          setError(res.data.error);
          setSuccess();
        }
      });
  };

  return (
    <div className={`${styles.main_page}`}>
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
      <div className={`${styles.register_form_div}`}>
        <form method="POST" className={`${styles.add_user_form}`}>
          <input
            type="email"
            name="login"
            placeholder="Twój login"
            value={editData.login}
            onChange={(e) =>
              setEditData({ ...editData, login: e.target.value })
            }
          />
          <input
            type="password"
            name="password"
            placeholder="Twoje hasło"
            onChange={(e) =>
              setEditData({ ...editData, password: e.target.value })
            }
          />
          <input
            type="password"
            name="password2"
            placeholder="Powtórz hasło"
            onChange={(e) =>
              setEditData({ ...editData, sec_password: e.target.value })
            }
          />
          <input
            type="file"
            name="img"
            onChange={(e) =>
              setEditData({ ...editData, img: e.target.files[0] })
            }
          />

          <button
            onClick={editUserData}
            className={`${styles.register_button}`}
          >
            Zmień dane!
          </button>
          {error ? (
            <div className={`${styles.error_message}`}>{error}</div>
          ) : null}
          {success ? (
            <div className={`${styles.success_message}`}>{success}</div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
