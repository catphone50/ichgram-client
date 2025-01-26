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
import { useEffect, useState } from "react";
import menuIcon from "../../assets/icons/menu.svg";
import Search from "../Search/Search";
import Notifications from "../Notifications/Notifications";
import Badge from "../Badge/index";
import io from "socket.io-client";

const SideNav = ({ setTotalUnreadCount, totalUnreadCount }) => {
  const location = useLocation();
  const { user, isLoading, error } = useSelector((state) => state.user);

  const [socket, setSocket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
      withCredentials: true,
      query: {
        token: localStorage.getItem("token"),
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinNotifications");
    socket.emit("getTotalUnreadMessages");

    const handleInitialNotifications = (notifications) => {
      const unreadNotifications = notifications.filter(
        (notification) => !notification.read
      );
      setNotificationCount(unreadNotifications.length);
    };

    const handleReceiveNotification = (newNotification) => {
      setNotificationCount((prevCount) =>
        !newNotification.read ? prevCount + 1 : prevCount
      );
    };

    const handleTotalUnreadMessages = ({ count }) => {
      setTotalUnreadCount(count);
    };

    const handleNewMessage = () => {
      socket.emit("getTotalUnreadMessages");
    };

    socket.on("initialNotifications", handleInitialNotifications);
    socket.on("receiveNotification", handleReceiveNotification);
    socket.on("totalUnreadMessages", handleTotalUnreadMessages);
    socket.on("newMessage", handleNewMessage);

    socket.on("connect_error", (error) => {
      console.error("Ошибка подключения:", error);
    });

    return () => {
      socket.off("initialNotifications", handleInitialNotifications);
      socket.off("receiveNotification", handleReceiveNotification);
      socket.off("totalUnreadMessages", handleTotalUnreadMessages);
      socket.off("newMessage", handleNewMessage);
      socket.off("connect_error");
    };
  }, [socket]);

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
    setShowModal(false);
    setShowNotifications(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowModal(false);
    setShowSearch(false);
    setNotificationCount(0);
    if (socket) {
      socket.emit("markAsRead");
    }
  };

  const userProfile = user ? user : null;

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
          <li
            className={`${styles.navigationItem} ${
              location.pathname === "/home" ? styles.active : ""
            }`}
          >
            <Link to="/home" className={styles.navigationLink}>
              <img
                width={20}
                height={20}
                src={location.pathname === "/home" ? acHome : home}
                alt="Home Icon"
                className={styles.icon}
              />
              Home
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <button onClick={toggleSearch} className={styles.navigationLink}>
              <img
                width={20}
                height={20}
                src={showSearch ? acSearch : search}
                alt="Search Icon"
                className={styles.icon}
              />
              Search
            </button>
          </li>
          <li
            className={`${styles.navigationItem} ${
              location.pathname === "/explore" ? styles.active : ""
            }`}
          >
            <Link to="/explore" className={styles.navigationLink}>
              <img
                width={20}
                height={20}
                src={location.pathname === "/explore" ? acExplore : explore}
                alt="Explore Icon"
                className={styles.icon}
              />
              Explore
            </Link>
          </li>
          <li
            className={`${styles.navigationItem} ${
              location.pathname === "/messages" ? styles.active : ""
            }`}
          >
            <Link to="/messages" className={styles.navigationLink}>
              <img
                width={20}
                height={20}
                src={location.pathname === "/messages" ? acMessage : message}
                alt="Messages Icon"
                className={styles.icon}
              />
              Messages
            </Link>
            {totalUnreadCount > 0 && <Badge text={totalUnreadCount} />}
          </li>
          <li className={styles.navigationItem}>
            <button
              onClick={toggleNotifications}
              className={styles.navigationLink}
            >
              <img
                width={20}
                height={20}
                src={showNotifications ? acNotification : notification}
                alt="Notifications Icon"
                className={styles.icon}
              />
              Notifications
            </button>
            {notificationCount > 0 && <Badge text={notificationCount} />}
          </li>
          <li className={styles.navigationItem}>
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
          </li>
          <li
            className={`${styles.navigationItem} ${
              location.pathname === `/profile/${userProfile?.id}`
                ? styles.active
                : ""
            }`}
          >
            <Link
              to={`/profile/${userProfile?.id}`}
              className={styles.navigationLink}
            >
              <img
                width={20}
                height={20}
                src={userProfile?.avatar || profile}
                alt="Profile Icon"
                className={styles.icon}
              />
              Profile
            </Link>
          </li>
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
