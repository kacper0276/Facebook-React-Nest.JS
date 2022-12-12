import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UseWebsiteTitle from "../../hooks/UseWebsiteTitle";
import styles from "./UserPanel.module.css";

export default function UserPanel() {
  UseWebsiteTitle("Panel użytkownika");
  const menu = useRef();
  const [username, setUsername] = useState();

  useEffect(() => {
    setUsername(window.localStorage.getItem("login-status"));
  }, []);

  const showMenu = () => {
    menu.current.classList.toggle(`${styles.active}`);
  };

  return (
    <div className={`${styles.div_main}`}>
      <div className={`${styles.side_option}`} ref={menu}>
        <div className={`${styles.arrow_in_side_option}`} onClick={showMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            />
          </svg>
        </div>
        <div className={`${styles.link_in_menu}`}>
          <Link to={"/paneluzytkownika/dodajpost"}>Dodaj post</Link>
        </div>
        <div className={`${styles.link_in_menu}`}>
          <Link to={"/paneluzytkownika/listapostow"}>Lista postów</Link>
        </div>
        <div className={`${styles.link_in_menu}`}>
          <Link to={"/paneluzytkownika/zmianiadanychuzytkownika"}>
            Zmień login/hasło
          </Link>
        </div>
        <div className={`${styles.link_in_menu}`}>
          <Link to={"/paneluzytkownika/dodajznajomych"}>
            Dodaj/usuń znajomych
          </Link>
        </div>
      </div>
      <div className={`${styles.main_text}`}>
        <p>Witaj w swoim panelu: {username}</p>
      </div>
    </div>
  );
}
