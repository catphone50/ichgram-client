import { useDispatch } from "react-redux";
import styles from "./PostDialog.module.css";
import { deletePost } from "../../store/features/posts/postActions";
import ConfirmDialog from "../ConfirmDialog";
import { useState } from "react";
import { checkUserId } from "../../services/isAuthenticated";
const PostDialog = ({ onClose, postId, onDelete, userId, author }) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const isMyPost = checkUserId(author);

  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(deletePost(postId));
    onDelete();
    onClose();
    setIsConfirmDialogOpen(false);
  };

  const handleCancelConfirm = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleDelete = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleGoToPost = () => {
    onClose();
  };
  const handleCopyLink = async () => {
    if (isMyPost) {
      try {
        await navigator.clipboard.writeText(
          `${window.location.origin}/profile/${userId}/post/${postId}`
        );
        onClose();
      } catch (error) {
        console.error("Error copying link:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${window.location.origin}/home/post/${postId}`
        );
        onClose();
      } catch (error) {
        console.error("Error copying link:", error);
      }
    }
  };

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
        {isMyPost && (
          <button className={styles.dialogBtn} onClick={handleDelete}>
            Delete
          </button>
        )}
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
      {isConfirmDialogOpen && (
        <ConfirmDialog
          onClose={handleCancelConfirm}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default PostDialog;
