import styles from "./ExplorePage.module.css";
import SideNav from "../../components/SideNav/SideNav";

const ExplorePage = () => {
  return (
    <div className={styles.searchContainer}>
      <aside className={styles.navigation}>
        <SideNav />
      </aside>

      <main className={styles.content}>Explore Page</main>
    </div>
  );
};

export default ExplorePage;
