import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideNav.module.css";
import logo from "../../assets/images/logo.svg";
import home from "../../assets/icons/home.svg";
import acHome from "../../assets/icons/home-active.svg";
import search from "../../assets/icons/search.svg";
import acSearch from "../../assets/icons/search-active.svg";
import explore from "../../assets/icons/explore.svg";
import acExplore from "../../assets/icons/explore-active.svg";
import message from "../../assets/icons/messenger.svg";
import acMessage from "../../assets/icons/messenger-active.svg";
import notification from "../../assets/icons/notification.svg";
import acNotification from "../../assets/icons/notifications-active.svg";
import create from "../../assets/icons/create.svg";
import profile from "../../assets/icons/benutzer.svg";
import CreateNewPost from "../CreateNewPost/CreateNewPost";
import { useState } from "react";
import menuIcon from "../../assets/icons/menu.svg";
import Search from "../Search/Search";
import Notifications from "../Notifications/Notifications";

const SideNav = () => {
  const location = useLocation();
  const { user, isLoading, error } = useSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    console.log("error: ", error);
    return <div>Ошибка: {error.message}</div>;
  }

  if (!user) {
    console.log("user: ", user);
    return <div>Пользователь не найден</div>;
  }

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const userProfile = user ? user : null;

  const navItems = [
    { name: "Home", path: "/home", icon: home, activeIcon: acHome },
    {
      name: "Search",
      component: (
        <button onClick={toggleSearch} className={styles.navigationLink}>
          <img
            width={20}
            height={20}
            src={`${showSearch ? acSearch : search}`}
            alt="Search Icon"
            className={styles.icon}
          />
          Search
        </button>
      ),
      icon: search,
      activeIcon: acSearch,
    },
    { name: "Explore", path: "/explore", icon: explore, activeIcon: acExplore },
    {
      name: "Messages",
      path: "/messages",
      icon: message,
      activeIcon: acMessage,
    },
    {
      name: "Notifications",
      component: (
        <button onClick={toggleNotifications} className={styles.navigationLink}>
          <img
            width={20}
            height={20}
            src={`${showNotifications ? acNotification : notification}`}
            alt="Notifications Icon"
            className={styles.icon}
          />
          Notifications
        </button>
      ),
      icon: notification,
      activeIcon: acNotification,
    },

    {
      name: "Create",
      component: (
        <button onClick={openModal} className={styles.navigationLink}>
          <img
            width={20}
            height={20}
            src={create}
            alt="Create Icon"
            className={styles.icon}
          />
          Create
        </button>
      ),
    },
    {
      name: "Profile",
      path: `/profile/${userProfile?.id}`,
      icon: userProfile?.avatar || profile,
      activeIcon: userProfile?.avatar || profile,
    },
  ];

  return (
    <>
      <button className={styles.menuButton} onClick={toggleSidebar}>
        <img src={menuIcon} alt="Menu Icon" />
      </button>
      <nav
        className={`${styles.sideNav} ${isSidebarOpen ? styles.active : ""}`}
      >
        <Link to="/home" className={styles.navigationLink}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
        <ul className={styles.navigationList}>
          {navItems.map((item) =>
            item.path ? (
              <li
                key={item.name}
                className={`${styles.navigationItem} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
              >
                <Link to={item.path} className={styles.navigationLink}>
                  <img
                    width={20}
                    height={20}
                    src={
                      location.pathname === item.path
                        ? item.activeIcon
                        : item.icon
                    }
                    alt={`${item.name} Icon`}
                    className={styles.icon}
                  />
                  {item.name}
                </Link>
              </li>
            ) : (
              <li key={item.name} className={styles.navigationItem}>
                {item.component}
              </li>
            )
          )}
        </ul>
        {showNotifications && (
          <Notifications closeNotifications={toggleNotifications} />
        )}
        {showSearch && <Search closeSearch={toggleSearch} />}
        {showModal && (
          <CreateNewPost showModal={showModal} closeModal={closeModal} />
        )}
      </nav>
    </>
  );
};

export default SideNav;
