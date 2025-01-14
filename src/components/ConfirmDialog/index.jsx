import styles from "./styles.module.css";

const ConfirmDialog = ({ onClose, onConfirm }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <p>Are you sure you want to delete this post?</p>
        <div className={styles.dialogButtons}>
          <button className={styles.dialogBtn} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.dialogBtn} onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
