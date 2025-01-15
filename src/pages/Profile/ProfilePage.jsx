import Profile from "../../components/Profile/Profile";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { getUserWithPosts } from "../../store/features/users/userActions";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const { user, isLoading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithPosts(user.id));
  }, []);

  // Показать индикатор загрузки, если данные еще не загружены
  if (isLoading) return <p>Loading...</p>;

  // Обработать ошибки
  if (error) return <p>Error: {user.message}</p>;

  return (
    <>
      <div>{<Profile profile={user} />}</div>
      <Footer />
    </>
  );
};

export default ProfilePage;
