import { useDispatch } from "react-redux";
import styles from "./PostDialog.module.css";
import { deletePost } from "../../store/features/posts/postActions";

const PostDialog = ({ onClose, postId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const result = window.confirm("Are you sure you want to delete this post?");
    if (!result) {
      onClose();
      return;
    }

    dispatch(deletePost(postId));
  };
  const handleEdit = () => {};
  const handleGoToPost = () => {};
  const handleCopyLink = () => {};
  const handleCancel = () => {
    onClose();
  };
  const handleCancelClose = (e) => {
    e.stopPropagation();
    onClose();
  };
  return (
    <div className={styles.modalBackdrop} onClick={handleCancelClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.dialogBtn} onClick={handleDelete}>
          Delete
        </button>
        <button className={styles.dialogBtn} onClick={handleEdit}>
          Edit
        </button>
        <button className={styles.dialogBtn} onClick={handleGoToPost}>
          Go to post
        </button>
        <button className={styles.dialogBtn} onClick={handleCopyLink}>
          Copy link
        </button>
        <button className={styles.dialogBtn} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PostDialog;
