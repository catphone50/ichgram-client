import styles from "./styles.module.css";
import like from "../../assets/icons/like.svg";
import heart from "../../assets/icons/heart.svg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCommentLikes,
  fetchCommentLikesCount,
  likeComment,
  unlikeComment,
} from "../../store/features/likes/likeActions";

const Comment = ({ comment, userId }) => {
  const dispatch = useDispatch();
  const [isMyLike, setIsMyLike] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const findUserById = (array, userId) => {
    return array?.some((item) => item.user?._id === userId);
  };

  const likes = useSelector((state) => state.likes.commentLikes);

  useEffect(() => {
    if (likesCount > 0 && userId && likes.length > 0) {
      const liked = findUserById(likes, userId);
      setIsMyLike(liked);
    }
  }, [likes.length, likes, userId, likesCount]);

  useEffect(() => {
    if (comment && comment._id) {
      dispatch(fetchCommentLikes(comment._id));
    }
  }, [dispatch, comment, likesCount]);

  useEffect(() => {
    if (comment && comment._id) {
      dispatch(fetchCommentLikesCount(comment._id)).then((response) => {
        setLikesCount(response.payload.likesCount || 0);
      });
    }
  }, [dispatch, comment]);

  const handleLike = () => {
    if (!userId || !comment || !comment._id) return;

    const data = {
      userId: userId,
      commentId: comment._id,
    };

    if (isMyLike) {
      dispatch(unlikeComment(data)).then(() => {
        setIsMyLike(false);
        setLikesCount((prevState) => Math.max(prevState - 1, 0));
      });
    } else {
      dispatch(likeComment(data)).then(() => {
        setIsMyLike(true);
        setLikesCount((prevState) => prevState + 1);
      });
    }
  };

  return (
    <div className={styles.commentContainer}>
      <img
        className={styles.commentAvatar}
        src={comment.user.avatar}
        alt="User avatar"
      />

      <div className={styles.commentText}>
        <p className={styles.commentAuthor}>{comment.user.username}</p>
        <p className={styles.commentText}>{comment.text}</p>
      </div>
      <div className={styles.commentHeader}>
        <p className={styles.commentDate}>{comment.date}</p>
        <img
          onClick={handleLike}
          className={styles.icon}
          src={isMyLike ? heart : like}
          alt="like"
        />
        <p className={styles.commentLikes}>
          {likesCount > 0 ? `Likes: ${likesCount}` : ""}
        </p>
      </div>
    </div>
  );
};

export default Comment;
