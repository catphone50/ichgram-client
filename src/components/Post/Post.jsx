import { useEffect, useState } from "react";
import styles from "./Post.module.css";
import PostModal from "../PostModal/PostModal";
import { useNavigate } from "react-router-dom";
import avatarDemo from "../../assets/icons/benutzer.svg";
import like from "../../assets/icons/like.svg";
import heart from "../../assets/icons/heart.svg";
import comment from "../../assets/icons/comment.svg";
import { findUserById } from "../../services/count";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLikes,
  likePost,
  unlikePost,
} from "../../store/features/likes/likeActions";
import Comment from "../Comment/Comment";

const Post = ({ post, goTo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const likes = useSelector((state) => state.likes.postLikes);

  const handleDescriptionToggle = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const isDescriptionLong = post.description.length > 70;
  const truncatedDescription =
    post.description.slice(0, 70) + (isDescriptionLong ? "..." : "");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate(goTo);
  };

  // useEffect(() => {
  //   if (likesCount > 0 && user && user.id) {
  //     const liked = findUserById(likes, user.id);
  //     setIsLike(liked);
  //   }
  // }, [likes, likesCount, user]);

  // useEffect(() => {
  //   dispatch(fetchLikes(post._id));
  //   setLikesCount(likes?.length);
  // }, [dispatch, likes?.length, post._id]);

  const handleLike = () => {
    if (!post || !user) return;
    const data = {
      userId: user.id,
      postId: post._id,
    };

    if (isLike) {
      dispatch(unlikePost(data));
      setIsLike(false);
      setLikesCount(likesCount - 1);
    } else {
      dispatch(likePost(data));
      setIsLike(true);
      setLikesCount(likesCount + 1);
    }
  };

  console.log(post.comments);

  return (
    <>
      <div className={styles.post}>
        <div className={styles.header}>
          <img
            src={post.author.avatar || avatarDemo}
            alt="User avatar"
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <span className={styles.username}>{post.author.username}</span>
            <span className={styles.timeAgo}>
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
          <button className={styles.followBtn}>Follow</button>
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
            onClick={handleLike}
            className={styles.icon}
            src={`${isLike ? heart : like}`}
            alt="like"
          />
          <img className={styles.icon} src={comment} alt="comment" />
        </div>

        <div className={styles.footer}>
          <p className={styles.description}>
            {isDescriptionLong ? (
              <>
                {isDescriptionExpanded
                  ? post.description
                  : truncatedDescription}
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
                    src={comment.author?.avatar || avatarDemo}
                    alt="User avatar"
                    className={styles.commentAvatar}
                  />
                  <p>{comment.text}</p>
                </div>
              ))}
          </div>
          <button className={styles.commentBtn}>
            {post.comments.length > 0
              ? `View all comments ${post.comments.length}`
              : "No more comments, click to write one"}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <PostModal
          onClose={closeModal}
          isOpen={isModalOpen}
          postId={post._id}
        />
      )}
    </>
  );
};

export default Post;
