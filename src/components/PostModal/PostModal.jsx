import { useEffect, useState } from "react";
import PostDialog from "../PostDialog/PostDialog";
import styles from "./PostModal.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostModal = ({ onClose, postId, isOpen }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [post, setPost] = useState(null);

  const navigate = useNavigate();

  const userPosts = useSelector((state) => state.posts.userPosts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const error = useSelector((state) => state.posts.error);
  const user = useSelector((state) => state.user.user);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    isOpen && navigate(`post/${postId}`);
  }, [isOpen, navigate, postId]);

  useEffect(() => {
    if (userPosts && postId) {
      const foundPost = userPosts.find((p) => p._id === postId);

      setPost(foundPost);
    }
  }, [postId, userPosts]);

  if (!isOpen) {
    return null;
  }

  const handleOptionsClick = () => {
    setIsDialogOpen(true);
  };

  if (isLoading) {
    console.log("isLoading: ", isLoading);
    return <div>Загрузка...</div>;
  }

  if (error) {
    console.log("error: ", error);
    return <div>Ошибка: {error.message}</div>;
  }

  if (!post) {
    console.log("post: ", post);
    return <div>Пост не найден</div>;
  }

  const comments = post.comments || [];
  const likes = post.likes || [];

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={post.image} alt="Post" className={styles.postImage} />
        <div className={styles.modalInfo}>
          <div className={styles.modalHeader}>
            <div className={styles.authorInfo}>
              <img
                src={user.avatar}
                alt={user.username}
                className={styles.avatar}
              />
              <span className={styles.authorName}>{user.username}</span>
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
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
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
                        <span className={styles.commentText}>
                          {comment.text}
                        </span>
                        <div className={styles.commentMeta}>
                          <span>{comment.date}</span>
                          <span>{comment.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No comments available</p>
                )}
              </div>

              <div className={styles.likes}>
                <span>Likes: {likes.length}</span>
              </div>

              <div className={styles.postFooter}>
                <span>{post.createdAt}</span>
              </div>

              <div className={styles.addComment}>
                <input type="text" placeholder="Add a comment..." />
                <button>Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDialogOpen && (
        <PostDialog
          onClose={closeDialog}
          onDelete={onClose}
          postId={post._id}
          userId={user.id}
        />
      )}
    </div>
  );
};

export default PostModal;
