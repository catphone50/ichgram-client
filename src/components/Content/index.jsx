import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { PostModalContext } from "../PostModalContext";

const Content = ({ post }) => {
  const { handlePostSelect } = useContext(PostModalContext);

  const navigate = useNavigate();

  const openModal = () => {
    handlePostSelect(post);
    navigate(`post/${post._id}`);
  };

  return (
    <>
      <div className={styles.post}>
        <div className={styles.photo} onClick={openModal}>
          <img
            width={300}
            src={post.image || ""}
            alt="User post"
            className={styles.photoImage}
          />
        </div>
      </div>
    </>
  );
};

export default Content;
