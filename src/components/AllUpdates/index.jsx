import styles from "./styles.module.css";
import update from "../../assets/images/allUpdates.png";

const AllUpdates = () => {
  return (
    <div className={styles.container}>
      <img src={update} alt="update" className={styles.update} />
      <p className={styles.text}>You&apos;ve seen all the updates</p>
      <p>You have viewed all new publications</p>
    </div>
  );
};

export default AllUpdates;
