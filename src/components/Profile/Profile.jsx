import { useContext, useState } from "react";
import styles from "./Profile.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/users/userSlice";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/icons/benutzer.svg";
import Post from "../Post/Post";
import { PostModalContext } from "../PostModalContext";
import PostModal from "../PostModal/PostModal";

const Profile = ({ profile }) => {
  const {
    isModalOpen,
    closeModal,
    postsCount,
    followersCount,
    followingCount,
  } = useContext(PostModalContext);

  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMyProfile =
    profile?.id === JSON.parse(localStorage.getItem("user")).id;

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
  const isDescriptionLong = profile.description?.length > 255;
  const truncatedDescription =
    profile.description?.slice(0, 255) + (isDescriptionLong ? "..." : "");

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
                  {isDescriptionExpanded
                    ? profile.description
                    : truncatedDescription}
                  <button
                    onClick={handleDescriptionToggle}
                    className={styles.toggleDescription}
                  >
                    {isDescriptionExpanded ? "Less" : "More"}
                  </button>
                </>
              ) : (
                profile.description
              )}
            </p>
          </div>

          <div className={styles.socialLinks}>
            {profile.socialLinks?.length > 0 ? (
              profile.socialLinks.map((link) => (
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
        {isModalOpen && <PostModal onClose={closeModal} />}
      </div>

      <div className={styles.photoGallery}>
        {profile.posts?.length > 0 ? (
          profile.posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p>No photos</p>
        )}
      </div>
    </>
  );
};

export default Profile;
