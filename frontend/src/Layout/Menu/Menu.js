import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";

export default function Menu() {
  const burgerButton = useRef();
  const menuMobile = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const showMobileMenu = () => {
    menuMobile.current.classList.toggle(`${styles.active}`);
    burgerButton.current.classList.toggle(`${styles.active}`);
  };

  const logOutUser = () => {
    window.localStorage.removeItem("login-status");

    navigate("/");
  };

  useEffect(() => {
    showMobileMenu();
  }, [location]);

  return (
    <div className={`${styles.main_Page}`}>
      <div
        className={`${styles.burger_menu}`}
        ref={burgerButton}
        onClick={showMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`${styles.mobile_menu}`} ref={menuMobile}>
        <div className={`${styles.button_Link}`}>
          <Link to="/" className={`${styles.link_Class}`}>
            Strona główna
          </Link>
        </div>
        {window.localStorage.getItem("login-status") ? (
          <>
            <div className={`${styles.button_Link}`}>
              <button className={`${styles.link_Class}`} onClick={logOutUser}>
                Wyloguj się
              </button>
            </div>
            <div className={`${styles.button_Link}`}>
              <Link to="/paneluzytkownika" className={`${styles.link_Class}`}>
                Panel użytkownika
              </Link>
            </div>
            <div className={`${styles.button_Link}`}>
              <Link
                to={`/profiluzytkownika/${window.localStorage.getItem(
                  "login-status"
                )}`}
                className={`${styles.link_Class}`}
              >
                Twój profil
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={`${styles.button_Link}`}>
              <Link to="/zaloguj" className={`${styles.link_Class}`}>
                Zaloguj się
              </Link>
            </div>
            <div className={`${styles.button_Link}`}>
              <Link to="/zarejestruj" className={`${styles.link_Class}`}>
                Zarejestruj sie
              </Link>
            </div>
          </>
        )}
        <div className={`${styles.button_Link}`}>
          <Link to="/posty" className={`${styles.link_Class}`}>
            Przeglądaj posty
          </Link>
        </div>
      </div>
    </div>
  );
}
