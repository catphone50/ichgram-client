import { useState } from "react";
import styles from "./styles.module.css";
import avatar from "../../assets/icons/benutzer.svg";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: "Alice", avatar: "" },
    { id: 2, name: "Bob", avatar: "" },
  ];

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      setMessages([...messages, { user: "You", text: currentMessage }]);
      setCurrentMessage("");
    }
  };

  return (
    <div className={styles.chatContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h3>Users</h3>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li
              key={user.id}
              className={`${styles.user} ${
                selectedUser?.id === user.id ? styles.activeUser : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <img
                src={user.avatar || avatar}
                alt={user.name}
                className={styles.avatar}
              />
              <span>{user.name}</span>
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
                alt={selectedUser.name}
                className={styles.avatar}
              />
              <h3>{selectedUser.name}</h3>
            </div>
            <div className={styles.messages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${
                    msg.user === "You" ? styles.sent : styles.received
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
