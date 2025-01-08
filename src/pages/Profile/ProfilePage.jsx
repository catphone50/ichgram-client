import styles from "./ProfilePage.module.css";
import SideNav from "../../components/SideNav/SideNav";
import Profile from "../../components/Profile/Profile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../store/features/users/userActions";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn, isLoading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo());
    }
  }, [isLoggedIn, dispatch]);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className={styles.searchContainer}>
      <aside className={styles.navigation}>
        <SideNav />
      </aside>

      <main className={styles.content}>
        <Profile profile={user} />
      </main>
    </div>
  );
};

export default ProfilePage;
