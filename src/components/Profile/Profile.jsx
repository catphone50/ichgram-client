import { useState } from "react";
import styles from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/users/userSlice";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/icons/benutzer.svg";
import Post from "../Post/Post";
import { useEffect } from "react";
import { fetchUserPosts } from "../../store/features/posts/postActions";
import { getUserInfo } from "../../store/features/users/userActions";

const Profile = () => {
  const isMyProfile = true;
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    userPosts,
    isLoading: postsLoading,
    error: postsError,
  } = useSelector((state) => state.posts);
  const {
    user: profile,
    isLoading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);

  const description = profile.description || ""; // Описание по умолчанию
  const followersCount = profile.followersCount || 0; // Если количество подписчиков отсутствует
  const followingCount = profile.followingCount || 0; // Если количество подписок отсутствует
  const socialLinks = profile.socialLinks || []; // Если нет социальных ссылок

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(fetchUserPosts());
  }, []);

  useEffect(() => {
    if (userPosts) {
      dispatch(fetchUserPosts()).then((response) => {
        setPostsCount(response.payload.length || 0);
      });
    }
  }, [dispatch, userPosts.length]);

  useEffect(() => {
    if (userPosts) {
      setPosts(userPosts);
    }
  }, [userPosts]);

  const handleDescriptionToggle = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleExit = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  // Логика для сокращения описания
  const isDescriptionLong = description.length > 255;
  const truncatedDescription =
    description.slice(0, 255) + (isDescriptionLong ? "..." : "");

  //  if (postsError) return <p>Error: {postsError.message}</p>;
  if (postsLoading) return <p>Loading...</p>;
  // Показать индикатор загрузки, если данные еще не загружены
  if (userLoading) return <p>Loading...</p>;

  // Обработать ошибки
  if (userError || postsError) return <p>Error: {userError.message}</p>;

  return (
    <>
      <div className={styles.profileHeader}>
        <img
          src={profile.avatar || avatar}
          alt="Avatar"
          className={styles.avatar}
        />
        <div className={styles.profileInfo}>
          <div className={styles.profileHeaderName}>
            <h2 className={styles.username}>
              {profile.username || "No username"}
            </h2>
            {isMyProfile && (
              <>
                <button
                  className={styles.editProfileButton}
                  onClick={handleEditProfile}
                >
                  Edit profile
                </button>
                <button
                  className={styles.exitProfileButton}
                  onClick={handleExit}
                >
                  Exit
                </button>
              </>
            )}
          </div>

          <div className={styles.stats}>
            <span>
              <p>{postsCount}</p> posts
            </span>
            <span>
              <p>{followersCount}</p> followers
            </span>
            <span>
              <p>{followingCount}</p> following
            </span>
          </div>

          <div className={styles.description}>
            <p>
              {isDescriptionLong ? (
                <>
                  {isDescriptionExpanded ? description : truncatedDescription}
                  <button
                    onClick={handleDescriptionToggle}
                    className={styles.toggleDescription}
                  >
                    {isDescriptionExpanded ? "Less" : "More"}
                  </button>
                </>
              ) : (
                description
              )}
            </p>
          </div>

          <div className={styles.socialLinks}>
            {socialLinks.length > 0 ? (
              socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.platform}
                </a>
              ))
            ) : (
              <p>No social links provided</p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.photoGallery}>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p>No photos</p>
        )}
      </div>
    </>
  );
};

export default Profile;
