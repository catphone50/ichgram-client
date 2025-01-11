import { useState } from "react";
import styles from "./Post.module.css";
import PostModal from "../PostModal/PostModal";
import { useNavigate } from "react-router-dom";

const Post = ({ post, authorId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate(`/profile/${authorId}`);
  };

  return (
    <>
      <div className={styles.photo} onClick={openModal}>
        <img
          width={300}
          src={post.image || ""}
          alt="User post"
          className={styles.photoImage}
        />
      </div>
      <PostModal onClose={closeModal} isOpen={isModalOpen} postId={post._id} />
    </>
  );
};

export default Post;
