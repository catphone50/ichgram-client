import styles from "./EditProfile.module.css";
import EditProfile from "../../components/EditProfile/EditProfile";
import { useEffect } from "react";
import { getUserInfo } from "../../store/features/users/userActions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn, isLoading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo(user.id));
    }
  }, [isLoggedIn, dispatch]);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <>
      <div className={styles.container}>
        <EditProfile profile={user} />
      </div>
      <Footer />
    </>
  );
};

export default EditProfilePage;
