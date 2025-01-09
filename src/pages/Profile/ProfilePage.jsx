//import styles from "./ProfilePage.module.css";
import Profile from "../../components/Profile/Profile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../store/features/users/userActions";
import { fetchUserPosts } from "../../store/features/posts/postActions";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const {
    user,
    isLoggedIn,
    isLoading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);

  const {
    userPosts,
    isLoading: postsLoading,
    error: postsError,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo());
      dispatch(fetchUserPosts());
    }
  }, [isLoggedIn, dispatch]);

  if (userLoading || postsLoading) return <p>Loading...</p>;
  if (userError) return <p>Error: {userError}</p>;
  if (postsError) return <p>Error: {postsError}</p>;

  return (
    <div>
      <Profile profile={user} userPosts={userPosts} />
    </div>
  );
};

export default ProfilePage;
