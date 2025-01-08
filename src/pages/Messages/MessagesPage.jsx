import styles from "./MessagesPage.module.css";
import SideNav from "../../components/SideNav/SideNav";

const MessagesPage = () => {
  return (
    <div className={styles.searchContainer}>
      <aside className={styles.navigation}>
        <SideNav />
      </aside>

      <main className={styles.content}>Messages Page</main>
    </div>
  );
};

export default MessagesPage;
