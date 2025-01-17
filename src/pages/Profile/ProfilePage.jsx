import Profile from "../../components/Profile/Profile";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { getUserWithPosts } from "../../store/features/profile/profileActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { user, isLoading, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const profileId = useParams();

  useEffect(() => {
    dispatch(getUserWithPosts(profileId.id));
  }, [profileId]);

  console.log(
    user?.following?.some(
      (following) => following._id === "678523a4dbfe8cc70d7c20ba"
    )
  );

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
