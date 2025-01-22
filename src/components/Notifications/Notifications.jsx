import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import io from "socket.io-client";
import avatar from "../../assets/icons/benutzer.svg";
import { formatDate } from "../../services/formatData";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  withCredentials: true,
  query: {
    token: localStorage.getItem("token"), // Передаем токен как параметр запроса
  },
});

const Notifications = ({ closeNotifications }) => {
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    socket.emit("joinNotifications");
    socket.on("initialNotifications", (notifications) => {
      setNotificationList(notifications);
    });

    socket.on("connect_error", (error) => {
      console.error("Ошибка подключения:", error);
    });

    return () => {
      console.log("Отключение от сервера уведомлений...");
      socket.off("connect");
      socket.off("initialNotifications");
      socket.off("receiveNotification");
      socket.off("deleteNotification");
      socket.off("connect_error");
    };
  }, []);

  return (
    <div className={styles.modalBackdrop} onClick={closeNotifications}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <p className={styles.title}>Notifications</p>
        <p className={styles.text}>New</p>
        <div className={styles.notificationList}>
          {notificationList.map((notification, index) => (
            <div key={index} className={styles.notificationItem}>
              <img
                src={notification.sender.avatar || avatar}
                alt="Notification"
                className={styles.avatar}
              />
              <p className={styles.notificationMessage}>
                {notification.message}
              </p>
              <p className={styles.notificationDate}>
                {formatDate(notification.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
