import styles from "./RegisterPage.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UseWebsiteTitle from "../../hooks/UseWebsiteTitle";
import axios from "axios";

export default function RegisterPage() {
  UseWebsiteTitle("Zarejestruj się");

  const [registerData, setRegisterData] = useState({
    login: "",
    password: "",
    sec_password: "",
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const registerUser = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3002/api/users/register", {
        registerData: registerData,
      })
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          setSuccess();
        } else if (res.data.success) {
          setSuccess(res.data.success);
          setError();
        }
      });
  };

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
      <div className={`${styles.register_form_div}`}>
        <form method="POST" className={`${styles.add_user_form}`}>
          <input
            type="email"
            name="login"
            placeholder="Twój login"
            onChange={(e) =>
              setRegisterData({ ...registerData, login: e.target.value })
            }
          />
          <input
            type="password"
            name="password"
            placeholder="Twoje hasło"
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />
          <input
            type="password"
            name="password2"
            placeholder="Powtórz hasło"
            onChange={(e) =>
              setRegisterData({ ...registerData, sec_password: e.target.value })
            }
          />

          <button
            onClick={registerUser}
            className={`${styles.register_button}`}
          >
            Zarejestruj się
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
