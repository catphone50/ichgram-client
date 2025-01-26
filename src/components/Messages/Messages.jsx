import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import avatar from "../../assets/icons/benutzer.svg";
import io from "socket.io-client";
import Badge from "../Badge";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  withCredentials: true,
  query: {
    token: localStorage.getItem("token"), // Передаем токен как параметр запроса
  },
});

const Messages = ({ setTotalUnreadCount }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMutualFollowers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/follow/mutualFollowers/${user.id}`
        );
        if (!response.ok) {
          throw new Error("Ошибка при получении пользователей");
        }
        const data = await response.json();
        setUsers(data);

        data.forEach((profile) => {
          socket.emit("getUnreadMessagesCount", { targetUserId: profile._id });
        });
      } catch (error) {
        console.error("Ошибка при получении пользователей:", error);
      }
    };

    fetchMutualFollowers();
  }, [user.id]);

  useEffect(() => {
    socket.on("unreadMessagesCount", ({ count, targetUserId }) => {
      setUnreadCounts((prevCounts) => ({
        ...prevCounts,
        [targetUserId]: count,
      }));
      console.log(`Unread messages for ${targetUserId}: ${count}`);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log("Received new message:", message);
    });

    socket.on("newMessage", (messages) => {
      setMessages((prevMessages) => [...prevMessages, messages]);
      setUnreadCounts((prevCounts) => ({
        ...prevCounts,
        [messages.sender_id]: prevCounts[messages.sender_id] + 1,
      }));
      console.log("Loaded messages:", messages);
    });

    socket.on("connect_error", (error) => {
      console.error("Ошибка подключения:", error);
    });

    return () => {
      socket.off("unreadMessagesCount");
      socket.off("receiveMessage");
      socket.off("newMessage");
      socket.off("connect_error");
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      socket.emit("getUnreadMessagesCount", { targetUserId: selectedUser._id });
      socket.on("loadMessages", (messages) => {
        setMessages(messages);
        console.log("Loaded messages:", messages);
      });
      socket.on("unreadMessagesCount", ({ count, targetUserId }) => {
        setUnreadCounts((prevCounts) => ({
          ...prevCounts,
          [targetUserId]: count,
        }));
        console.log(`Unread messages for ${targetUserId}: ${count}`);
      });
      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        console.log("Received new message:", message);
      });
      socket.on("newMessage", (messages) => {
        setMessages((prevMessages) => [...prevMessages, messages]);
        setUnreadCounts((prevCounts) => ({
          ...prevCounts,
          [messages.sender_id]: prevCounts[messages.sender_id] + 1,
        }));
        console.log("Loaded messages:", messages);
      });
      socket.on("connect_error", (error) => {
        console.error("Ошибка подключения:", error);
      });
    }
    return () => {
      socket.off("loadMessages");
      socket.off("unreadMessagesCount");
      socket.off("receiveMessage");
      socket.off("newMessage");
      socket.off("connect_error");
    };
  }, [selectedUser]);

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "" && selectedUser) {
      const message = {
        user: user.id,
        text: currentMessage,
        targetUserId: selectedUser._id,
      };

      // Отправка сообщения через WebSocket
      socket.emit("sendMessage", message);
      setCurrentMessage("");
      console.log("Sent message:", message);
    }
  };

  const handleTotalUnreadMessages = (count) => {
    setTotalUnreadCount(count);
  };

  const handleSelectUser = async (profile) => {
    setSelectedUser(profile);
    setMessages([]); // Очищаем сообщения при выборе нового пользователя

    socket.emit("markMessagesAsRead", { senderId: profile._id });
    socket.emit("getTotalUnreadMessages");
    socket.on("totalUnreadMessages", handleTotalUnreadMessages);
    socket.on("loadMessages", (messages) => {
      setMessages(messages);
      console.log("Loaded messages:", messages);
    });

    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u._id === profile._id ? { ...u, unreadCount: 0 } : u
      )
    );

    setUnreadCounts((prevCounts) => ({
      ...prevCounts,
      [profile._id]: 0,
    }));

    console.log(`Joined room with user ${profile._id}`);
    // Присоединяемся к комнате сообщений
    socket.emit("joinRoom", { targetUserId: profile._id });
  };

  return (
    <div className={styles.chatContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h3>Users</h3>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li
              key={user._id}
              className={`${styles.user} ${
                selectedUser?._id === user._id ? styles.activeUser : ""
              }`}
              onClick={() => handleSelectUser(user)}
            >
              <img
                src={user.avatar || avatar}
                alt={user.username}
                className={styles.avatar}
              />
              <span>{user.username}</span>
              {unreadCounts[user._id] > 0 && (
                <Badge text={unreadCounts[user._id]} />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Room */}
      <div className={styles.chatRoom}>
        {selectedUser ? (
          <>
            <div className={styles.header}>
              <img
                src={selectedUser.avatar || avatar}
                alt={selectedUser.username}
                className={styles.avatar}
              />
              <h3>{selectedUser.username}</h3>
            </div>
            <div className={styles.messages}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`${styles.message} ${
                    msg.sender_id === user.id ? styles.sent : styles.received
                  }`}
                >
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>
            <div className={styles.inputArea}>
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type a message..."
                className={styles.input}
              />
              <button onClick={handleSendMessage} className={styles.sendButton}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className={styles.placeholder}>
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
