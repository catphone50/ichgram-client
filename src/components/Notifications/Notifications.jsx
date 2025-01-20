import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import io from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  withCredentials: true,
});

const Notifications = ({ closeNotifications }) => {
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    console.log("Подключение к серверу уведомлений...");

    socket.on("connect", () => {
      console.log("Клиент успешно подключен:", socket.id);
      socket.emit("joinNotifications");
    });

    socket.on("initialNotifications", (notifications) => {
      console.log("Получены начальные уведомления:", notifications);
      setNotificationList(notifications);
    });

    socket.on("receiveNotification", (data) => {
      console.log("Получено уведомление:", data);
      setNotificationList((prevList) => [...prevList, data]);
    });

    socket.on("deleteNotification", (data) => {
      console.log("Удалено уведомление:", data);
      setNotificationList((prevList) =>
        prevList.filter((notif) => notif.message !== data.message)
      );
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
              <p className={styles.notificationMessage}>
                {notification.message}
              </p>
              <p className={styles.notificationDate}>
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
