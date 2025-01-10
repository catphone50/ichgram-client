import { useState } from "react";
import styles from "./Post.module.css";

import PostModal from "../PostModal/PostModal";

const Post = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
