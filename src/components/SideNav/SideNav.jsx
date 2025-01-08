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

const SideNav = () => {
  const location = useLocation(); // Получение текущего пути
  const userProfile = useSelector((state) => state.user.user);

  const navItems = [
    { name: "Home", path: "/home", icon: home, activeIcon: acHome },
    { name: "Search", path: "/search", icon: search, activeIcon: acSearch },
    { name: "Explore", path: "/explore", icon: explore, activeIcon: acExplore },
    {
      name: "Messages",
      path: "/messages",
      icon: message,
      activeIcon: acMessage,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: notification,
      activeIcon: acNotification,
    },
    { name: "Create", path: "/create", icon: create, activeIcon: create },
    {
      name: "Profile",
      path: "/profile",
      icon: userProfile?.avatar || profile,
      activeIcon: userProfile?.avatar || profile,
    },
  ];

  return (
    <nav className={styles.sideNav}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <ul className={styles.navigationList}>
        {navItems.map((item) => (
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
                  location.pathname === item.path ? item.activeIcon : item.icon
                }
                alt={`${item.name} Icon`}
                className={styles.icon}
              />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
