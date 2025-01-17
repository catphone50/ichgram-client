import { useForm } from "react-hook-form";
import styles from "./CreateNewPost.module.css";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/icons/benutzer.svg";
import { fileToBase64 } from "../../services/converterToBasw64";
import { createPost, fetchPosts } from "../../store/features/posts/postActions";
import imageCompression from "browser-image-compression";
import { getUserWithPosts } from "../../store/features/profile/profileActions";

const CreateNewPost = ({ showModal, closeModal }) => {
  console.log("CreateNewPost component rendered");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const selectedFile = watch("image");

  const { user, isLoading, error } = useSelector((state) => state.user);

  const avatarUrl = user.avatar || avatar;
  const userName = user.username || "you name";
  const dispatch = useDispatch();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleFileChange = async (event) => {
    console.log("handleFileChange called");
    const file = event.target.files[0];
    console.log("file", file);
    if (file) {
      const options = {
        maxSizeMB: 0.05, // Максимальный размер 100 КБ
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        console.log("litlefile", compressedFile);
        setValue("image", compressedFile, { shouldValidate: true });
      } catch (error) {
        console.error("Error compressing file:", error);
      }
    }
  };

  const handelCloseModal = () => {
    setValue("image", null);
    reset();
    closeModal();
  };

  const onSubmit = async (data) => {
    const base64Image = await fileToBase64(data.image[0]);

    const postData = {
      description: data.description,
      image: base64Image,
    };

    try {
      await dispatch(createPost(postData));
      await dispatch(getUserWithPosts(user.id));
      await dispatch(fetchPosts());
      handelCloseModal();
    } catch (error) {
      console.error("Updating profile failed:", error);
    }
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Create new post</h2>
          <button
            type="button"
            onClick={handelCloseModal}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>

        <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.leftPanel}>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                console.log("onChange triggered");
                handleFileChange(event);
              }}
              {...register("image", { required: "Please upload an image." })}
              style={{ display: "none" }}
              className={styles.fileInput}
            />
            {selectedFile && selectedFile.length > 0 ? (
              <div
                className={styles.previewContainer}
                onClick={() =>
                  document.querySelector(`.${styles.fileInput}`).click()
                }
              >
                <img
                  src={URL.createObjectURL(selectedFile[0])}
                  alt="Preview"
                  className={styles.previewImage}
                />
              </div>
            ) : (
              <div
                className={styles.uploadPlaceholder}
                onClick={() =>
                  document.querySelector(`.${styles.fileInput}`).click()
                }
              >
                <span>Upload an image</span>
              </div>
            )}
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.profileSection}>
              <img
                src={avatarUrl}
                alt="Profile Avatar"
                className={styles.profileAvatar}
              />
              <h3>{userName}</h3>
            </div>

            <textarea
              id="description"
              {...register("description", {
                maxLength: {
                  value: 500,
                  message: "Description cannot exceed 500 characters",
                },
                required: "Description is required",
              })}
              rows="5"
              placeholder="Write a caption..."
              className={styles.textarea}
            />
            {errors.description && (
              <p className={styles.errorText}>{errors.description.message}</p>
            )}

            <div className={styles.uploadSection}>
              {errors.file && (
                <p className={styles.errorText}>{errors.file.message}</p>
              )}
            </div>

            <div className={styles.buttonsContainer}>
              <button type="submit" className={styles.submitButton}>
                Share
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPost;
