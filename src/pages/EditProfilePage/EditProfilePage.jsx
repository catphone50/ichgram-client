import styles from "./EditProfile.module.css";
import SideNav from "../../components/SideNav/SideNav";
import EditProfile from "../../components/EditProfile/EditProfile";
import { useEffect } from "react";
import { getUserInfo } from "../../store/features/users/userActions";
import { useDispatch, useSelector } from "react-redux";

const EditProfilePage = () => {
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
        <EditProfile profile={user} />
      </main>
    </div>
  );
};

export default EditProfilePage;
