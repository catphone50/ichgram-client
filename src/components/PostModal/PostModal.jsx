import { useEffect, useState } from "react";
import PostDialog from "../PostDialog/PostDialog";
import styles from "./PostModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addComment,
  getCommentsByPost,
} from "../../store/features/comments/commentsActions";
import Comment from "../Comment/Comment";

const PostModal = ({ onClose, postId, isOpen }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userPosts = useSelector((state) => state.posts.userPosts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const error = useSelector((state) => state.posts.error);
  const user = useSelector((state) => state.user.user);

  const isLoadingComments = useSelector((state) => state.comments.isLoading);
  const commentsError = useSelector((state) => state.comments.error);
  const comments = useSelector((state) => state.comments.comments);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    dispatch(getCommentsByPost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    isOpen && navigate(`post/${postId}`);
  }, [isOpen, navigate, postId]);

  useEffect(() => {
    if (userPosts && postId) {
      const foundPost = userPosts.find((p) => p._id === postId);

      setPost(foundPost);
    }
  }, [postId, userPosts]);

  if (!isOpen) {
    return null;
  }

  const handlePost = () => {
    const newComment = {
      userId: user.id,
      postId: postId,
      text: commentText,
    };

    dispatch(addComment(newComment));
    setCommentText("");
  };

  const handleOptionsClick = () => {
    setIsDialogOpen(true);
  };

  if (isLoading) {
    console.log("isLoading: ", isLoading);
    return <div>Загрузка...</div>;
  }

  if (error) {
    console.log("error: ", error);
    return <div>Ошибка: {error.message}</div>;
  }

  if (!post) {
    console.log("post: ", post);
    return <div>Пост не найден</div>;
  }

  const likes = post.likes || [];

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={post.image} alt="Post" className={styles.postImage} />
        <div className={styles.modalInfo}>
          <div className={styles.modalHeader}>
            <div className={styles.authorInfo}>
              <img
                src={user.avatar}
                alt={user.username}
                className={styles.avatar}
              />
              <span className={styles.authorName}>{user.username}</span>
            </div>
            <button
              className={styles.optionsButton}
              onClick={handleOptionsClick}
            >
              ...
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.postInfoContainer}>
              <div className={styles.postDescription}>
                <img src={user.avatar} alt="User avatar" />

                <div className={styles.descriptionText}>
                  <p className={styles.postAuthor}>{user.username}</p>
                  <p>{post.description}</p>
                </div>
                <div className={styles.descriptionFooter}>
                  <p className={styles.descriptionDate}>{post.date}</p>
                </div>
              </div>

              <div className={styles.comments}>
                {isLoadingComments && <p>Loading comments...</p>}
                {commentsError && (
                  <p>Error loading comments: {commentsError.message}</p>
                )}
                {comments.length > 0 &&
                  comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                  ))}
              </div>
            </div>

            <div className={styles.likes}>
              <span>Likes: {likes.length}</span>
            </div>

            <div className={styles.postFooter}>
              <span>{post.createdAt}</span>
            </div>

            <div className={styles.addComment}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                type="submit"
                className={styles.postButton}
                onClick={handlePost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      {isDialogOpen && (
        <PostDialog
          onClose={closeDialog}
          onDelete={onClose}
          postId={post._id}
          userId={user.id}
        />
      )}
    </div>
  );
};

export default PostModal;
