import React from "react";
import styles from "./Navbar.module.scss";
import logo from "../../assets/svgs/Logo.svg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navig = useNavigate();

  const goToHome = () => {
    navig(`/`);
  };

  const AddMovie = (item) => {
    navig(`/add-movie`);
  };

  return (
    <div className={styles.main}>
      <img src={logo} className={styles.logo} alt="logo" onClick={goToHome} />
      <div className={styles.links}></div>
      <div className={styles.buttons}>
        <button className={styles.add_film} onClick={AddMovie}>
          Add Film
        </button>
      </div>
    </div>
  );
}

export default Navbar;
