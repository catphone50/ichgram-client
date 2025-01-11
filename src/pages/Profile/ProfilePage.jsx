import Profile from "../../components/Profile/Profile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../store/features/users/userActions";
import { fetchUserPosts } from "../../store/features/posts/postActions";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const {
    user,

    isLoading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);

  const {
    userPosts,
    isLoading: postsLoading,
    error: postsError,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    // Загружаем данные о пользователе, если их нет
    dispatch(getUserInfo());

    // Загружаем посты пользователя, если их нет

    dispatch(fetchUserPosts());
  }, []);

  // Показать индикатор загрузки, если данные еще не загружены
  if (userLoading || postsLoading) return <p>Loading...</p>;

  // Обработать ошибки
  if (userError) return <p>Error: {userError}</p>;
  if (postsError) return <p>Error: {postsError}</p>;

  return (
    <div>
      {user && userPosts.length > 0 ? (
        <Profile profile={user} userPosts={userPosts} />
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default ProfilePage;
