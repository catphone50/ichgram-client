import styles from "./styles.module.css";
import { useForm } from "react-hook-form";

const EditModal = ({ onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onSave(data.description);
    onClose();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.closeButton} onClick={onClose}>
          X
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="description">Описание:</label>
            <input
              id="description"
              type="text"
              {...register("description", {
                required: "field is required",
                maxLength: {
                  value: 500,
                  message: "Maximum length is 500 characters",
                },
              })}
            />
            {errors.description && (
              <p className={styles.errorMessage}>
                {errors.description.message}
              </p>
            )}
          </div>
          <div className={styles.dialogButtons}>
            <button type="submit" className={styles.dialogBtn}>
              Save
            </button>
            <button
              type="button"
              className={styles.dialogBtn}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
