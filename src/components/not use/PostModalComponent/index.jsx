import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsById } from "../../store/features/posts/postActions";
import PostModal from "../PostModal/PostModal";

const PostModalComponent = ({ postIdParam }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.post);
  const { postId } = useParams();

  const openModal = () => {
    setIsModalOpen(true);
  };

  console.log("PostModalComponent rendered");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (postIdParam) {
      dispatch(fetchPostsById(postIdParam));
      openModal();
    }
    if (postId) {
      dispatch(fetchPostsById(postId));
      openModal();
    }
  }, []);

  return (
    <>
      {isModalOpen && (
        <PostModal onClose={closeModal} isOpen={isModalOpen} post={post} />
      )}
    </>
  );
};

export default PostModalComponent;
