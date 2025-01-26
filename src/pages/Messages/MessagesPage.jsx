//import styles from "./MessagesPage.module.css";
import Footer from "../../components/Footer";
import Messages from "../../components/Messages/Messages";

const MessagesPage = ({ setTotalUnreadCount }) => {
  return (
    <>
      <Messages setTotalUnreadCount={setTotalUnreadCount} />
      <Footer />
    </>
  );
};

export default MessagesPage;
