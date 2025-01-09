// import styles from "./MainPage.module.css";
import { useSelector } from "react-redux";

const MainPage = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  console.log(isLoggedIn, user.id);

  return <div>Main content</div>;
};

export default MainPage;
