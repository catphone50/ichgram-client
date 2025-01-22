import styles from "./styles.module.css";

const Badge = ({ text }) => {
  return <>{text > 0 && <span className={styles.badge}>{text}</span>}</>;
};

export default Badge;
