import styles from "./NotificationsPage.module.css";
import SideNav from "../../components/SideNav/SideNav";

const NotificationsPage = () => {
  return (
    <div className={styles.searchContainer}>
      <aside className={styles.navigation}>
        <SideNav />
      </aside>

      <main className={styles.content}>Notifications Page</main>
    </div>
  );
};

export default NotificationsPage;
