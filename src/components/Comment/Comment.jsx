import styles from "./styles.module.css";

const Comment = ({ comment }) => {
  return (
    <div className={styles.commentContainer}>
      <img src={comment.user.avatar} alt="User avatar" />

      <div className={styles.commentText}>
        <p className={styles.commentAuthor}>{comment.user.username}</p>
        <p className={styles.commentText}>{comment.text}</p>
      </div>
      <div className={styles.commentHeader}>
        <p className={styles.commentDate}>{comment.date}</p>
        <p className={styles.commentLikes}>
          {comment.likes ? `Likes: ${comment.likes}` : ""}
        </p>
      </div>
    </div>
  );
};

export default Comment;
