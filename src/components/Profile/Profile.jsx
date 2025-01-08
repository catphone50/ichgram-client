/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Profile.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/users/userSlice";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/icons/benutzer.svg";

const Profile = ({ profile }) => {
  const isMyProfile = true;
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDescriptionToggle = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleEditProfile = () => {
    // Перенаправить на страницу редактирования профиля
  };

  const handleExit = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  const avatarUrl = profile.avatar || avatar; // Используем дефолтный аватар
  const description = profile.description || ""; // Описание по умолчанию
  const postsCount = profile.postsCount || 0; // Если количество постов отсутствует
  const followersCount = profile.followersCount || 0; // Если количество подписчиков отсутствует
  const followingCount = profile.followingCount || 0; // Если количество подписок отсутствует
  const socialLinks = profile.socialLinks || []; // Если нет социальных ссылок
  const posts = profile.posts || []; // Если нет постов

  // Логика для сокращения описания
  const isDescriptionLong = description.length > 255;
  const truncatedDescription =
    description.slice(0, 255) + (isDescriptionLong ? "..." : "");

  return (
    <>
      <div className={styles.profileHeader}>
        <img src={avatarUrl} alt="Avatar" className={styles.avatar} />
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
                  className={styles.editProfileButton}
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
          posts.map((photo, index) => (
            <div key={index} className={styles.photo}>
              <img
                width={300}
                src={photo}
                alt={`Фото ${index + 1}`}
                className={styles.photoImage}
              />
            </div>
          ))
        ) : (
          <p>No photos</p>
        )}
      </div>
    </>
  );
};

export default Profile;
