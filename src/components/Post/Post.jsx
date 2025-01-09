import { useState } from "react";
import styles from "./Post.module.css";
import PostModal from "../PostModal/PostModal";

const Post = ({
  image,
  authorName,
  authorAvatar,
  postDate,
  likes,
  comments,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const allComments = comments || [];
  const likeCount = likes || 0;
  const postDateFromNow = postDate || "1 day ago";

  return (
    <>
      <div className={styles.photo} onClick={openModal}>
        <img
          width={300}
          src={image}
          alt="User post"
          className={styles.photoImage}
        />
      </div>
      {isModalOpen && (
        <PostModal
          image={image}
          authorName={authorName}
          authorAvatar={authorAvatar}
          postDate={postDateFromNow}
          likes={likeCount}
          comments={allComments}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Post;
