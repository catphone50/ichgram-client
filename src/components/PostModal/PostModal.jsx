import styles from "./PostModal.module.css";

const PostModal = ({
  image,
  authorName,
  authorAvatar,
  postDate,
  likes,
  comments,
  onClose,
}) => {
  const handleOptionsClick = () => {};

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Post" className={styles.postImage} />
        <div className={styles.modalInfo}>
          <div className={styles.modalHeader}>
            <div className={styles.authorInfo}>
              <img
                src={authorAvatar}
                alt={authorName}
                className={styles.avatar}
              />
              <span className={styles.authorName}>{authorName}</span>
            </div>
            <button
              className={styles.optionsButton}
              onClick={handleOptionsClick}
            >
              ...
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.postDetails}>
              <div className={styles.comments}>
                {comments.map((comment, index) => (
                  <div key={index} className={styles.comment}>
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className={styles.commentAvatar}
                    />
                    <div className={styles.commentContent}>
                      <span className={styles.commentAuthor}>
                        {comment.author}
                      </span>
                      <span className={styles.commentText}>{comment.text}</span>
                      <div className={styles.commentMeta}>
                        <span>{comment.date}</span>
                        <span>{comment.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.likes}>
                <span>Likes: {likes}</span>
              </div>

              <div className={styles.postFooter}>
                <span>{postDate}</span>
              </div>

              <div className={styles.addComment}>
                <input type="text" placeholder="Add a comment..." />
                <button>Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
