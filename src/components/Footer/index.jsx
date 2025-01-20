import { useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import CreateNewPost from "../CreateNewPost/CreateNewPost";
import Notifications from "../Notifications/Notifications";
import Search from "../Search/Search";

function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <div className={styles.footerContainer}>
      <div className={styles.linkConatiner}>
        <Link to={"/home"} className={styles.link}>
          Home
        </Link>
        <button onClick={toggleSearch} className={styles.link}>
          Search
        </button>
        <Link to={"/explore"} className={styles.link}>
          Explore
        </Link>
        <Link to={"/messages"} className={styles.link}>
          Messages
        </Link>
        <button onClick={toggleNotifications} className={styles.link}>
          Notificaitons
        </button>
        <button onClick={toggleModal} className={styles.link}>
          Create
        </button>
      </div>
      {showNotifications && (
        <Notifications closeNotifications={toggleNotifications} />
      )}
      {showSearch && <Search closeSearch={toggleSearch} />}
      {showModal && (
        <CreateNewPost showModal={showModal} closeModal={toggleModal} />
      )}
      <div className={styles.copyrightContainer}>© 2024 ICHgram</div>
    </div>
  );
}

export default Footer;
