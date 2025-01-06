import styles from "./SideNav.module.css";
import logo from "../../assets/images/logo.svg";
import home from "../../assets/icons/home.svg";

const SideNav = () => {
  return (
    <div className={styles.sideNav}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <ul>
        <li>
          {" "}
          <img src={home} alt="Logo" className={styles.logo} /> Home
        </li>
        <li>Search</li>
        <li>Explore</li>
        <li>Messages</li>
        <li>Notifications</li>
        <li>Create</li>
        <li>Profile</li>
      </ul>
    </div>
  );
};

export default SideNav;
