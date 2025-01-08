import Search from "../../components/Search/Search";
import styles from "./SearchPage.module.css";
import SideNav from "../../components/SideNav/SideNav";

const SearchPage = () => {
  return (
    <div className={styles.searchContainer}>
      <aside className={styles.navigation}>
        <SideNav />
      </aside>

      <main className={styles.content}>
        <Search />
      </main>
    </div>
  );
};

export default SearchPage;
