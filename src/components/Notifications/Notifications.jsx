import styles from "./styles.module.css";
//import avatar from "../../assets/icons/benutzer.svg";

const Search = ({ closeSearch }) => {
  return (
    <div className={styles.modalBackdrop} onClick={closeSearch}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <p className={styles.title}>Notifications</p>
        <p className={styles.text}>New</p>
      </div>
    </div>
  );
};

export default Search;
