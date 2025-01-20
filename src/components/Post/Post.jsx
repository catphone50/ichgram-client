import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Post.module.css";
import avatarDemo from "../../assets/icons/benutzer.svg";
import like from "../../assets/icons/like.svg";
import heart from "../../assets/icons/heart.svg";
import comment from "../../assets/icons/comment.svg";
import { PostModalContext } from "../PostModalContext";

const Post = ({ post }) => {
  const {
    user,
    handlePostSelect,
    isDescriptionExpanded,
    handleDescriptionToggle,
    handleLike,
    handleFollow,
    isUserAlreadyFollowed,
    checkIfUserIsFollowed,
  } = useContext(PostModalContext);

  const navigate = useNavigate();

  const openModal = () => {
    handlePostSelect(post);
    navigate(`post/${post._id}`);
  };

  useEffect(() => {
    checkIfUserIsFollowed(post.author._id);
  }, [post.author._id]);

  return (
    <>
      <div className={styles.post}>
        <div className={styles.header}>
          <Link to={`/profile/${post.author._id}`} className={styles.link}>
            <img
              src={post.author?.avatar || avatarDemo}
              alt="User avatar"
              className={styles.avatar}
            />
          </Link>
          <div className={styles.userInfo}>
            <span className={styles.username}>{post.author.username}</span>
            <span className={styles.timeAgo}>
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
          {post.author._id !== user.id && (
            <button
              className={styles.followBtn}
              onClick={() => handleFollow(post.author._id)}
            >
              {`${isUserAlreadyFollowed ? "Unfollow" : "Follow"}`}
            </button>
          )}
        </div>

        <div className={styles.photo} onClick={openModal}>
          <img
            width={300}
            src={post.image || ""}
            alt="User post"
            className={styles.photoImage}
          />
        </div>

        <div className={styles.like}>
          <img
            onClick={() => handleLike(post)}
            className={styles.icon}
            src={`${
              post.likes.some((like) => like.user === user.id) ? heart : like
            }`}
            alt="like"
          />
          <img className={styles.icon} src={comment} alt="comment" />
        </div>

        <div className={styles.likes}>
          <span>Likes: {post.likes?.length || 0}</span>
        </div>

        <div className={styles.footer}>
          <p className={styles.description}>
            {post.description.length > 70 ? (
              <>
                {isDescriptionExpanded
                  ? post.description
                  : post.description.slice(0, 70) + "..."}
                <button
                  onClick={handleDescriptionToggle}
                  className={styles.toggleDescription}
                >
                  {isDescriptionExpanded ? "Less" : "More"}
                </button>
              </>
            ) : (
              post.description
            )}
          </p>
          <div className={styles.stats}>
            {post.comments?.length > 0 &&
              post.comments?.slice(0, 2).map((comment, index) => (
                <div key={index} className={styles.comment}>
                  <img
                    src={comment.user?.avatar || avatarDemo}
                    alt="User avatar"
                    className={styles.commentAvatar}
                  />
                  <p>{comment.text}</p>
                </div>
              ))}
          </div>
          <button className={styles.commentBtn} onClick={openModal}>
            {post.comments.length > 0
              ? `View all comments ${post.comments.length}`
              : "No more comments, click to write one"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
