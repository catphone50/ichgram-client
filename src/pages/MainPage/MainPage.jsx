import SideNav from "../../components/SideNav/SideNav";
import styles from "./MainPage.module.css";
import { useSelector } from "react-redux";

const MainPage = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  console.log(isLoggedIn, user.id);

  return (
    <div className={styles.searchContainer}>
      <aside className={styles.navigation}>
        <SideNav />
      </aside>

      <main className={styles.content}>Main content</main>
    </div>
  );
};

export default MainPage;
