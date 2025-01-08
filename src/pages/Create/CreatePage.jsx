import styles from "./CreatePage.module.css";
import SideNav from "../../components/SideNav/SideNav";

const CreatePage = () => {
  return (
    <div className={styles.searchContainer}>
      <aside className={styles.navigation}>
        <SideNav />
      </aside>

      <main className={styles.content}>Create Page</main>
    </div>
  );
};

export default CreatePage;
