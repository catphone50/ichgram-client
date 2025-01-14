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
import like from "../../assets/icons/like.svg";
import heart from "../../assets/icons/heart.svg";
import comment from "../../assets/icons/comment.svg";
import {
  fetchLikes,
  likePost,
  unlikePost,
} from "../../store/features/likes/likeActions";
import { findUserById } from "../../services/count";
import avatarDemo from "../../assets/icons/benutzer.svg";

const PostModal = ({ onClose, postId, isOpen }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userPosts = useSelector((state) => state.posts.userPosts);
  const allPost = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const error = useSelector((state) => state.posts.error);
  const user = useSelector((state) => state.user.user);

  const isLoadingComments = useSelector((state) => state.comments.isLoading);
  const commentsError = useSelector((state) => state.comments.error);
  const comments = useSelector((state) => state.comments.comments);
  const likes = useSelector((state) => state.likes.postLikes);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (likesCount > 0 && user && user.id) {
      const liked = findUserById(likes, user.id);
      setIsLike(liked);
    }
  }, [likes, likesCount, user]);

  useEffect(() => {
    dispatch(fetchLikes(postId));
    setLikesCount(likes?.length);
  }, [dispatch, likes?.length, postId]);

  useEffect(() => {
    dispatch(getCommentsByPost(postId));
  }, [dispatch, postId, comments.length]);

  useEffect(() => {
    isOpen && navigate(`post/${postId}`);
  }, [isOpen, navigate, postId]);

  useEffect(() => {
    if (userPosts && postId) {
      const foundPost = userPosts.find((p) => p._id === postId);

      setPost(foundPost);
    }
    if (allPost && postId) {
      const foundPost = allPost.find((p) => p._id === postId);
      setPost(foundPost);
    }
  }, [postId, userPosts, allPost]);

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

  const handleLike = () => {
    if (!post || !user) return;
    const data = {
      userId: user.id,
      postId: post._id,
    };

    if (isLike) {
      dispatch(unlikePost(data));
      setIsLike((prevState) => !prevState);
      setLikesCount((prevState) => prevState - 1);
    } else {
      dispatch(likePost(data));
      setIsLike((prevState) => !prevState);
      setLikesCount((prevState) => prevState + 1);
    }
  };

  console.log(post);

  const handleOptionsClick = () => {
    setIsDialogOpen(true);
  };

  if (isLoading) {
    console.log("isLoading: ", isLoading);
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("error: ", error);
    return <div>Error: {error.message}</div>;
  }

  if (!post) {
    console.log("post: ", post);
    return <div>No post</div>;
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={post.image} alt="Post" className={styles.postImage} />
        <div className={styles.modalInfo}>
          <div className={styles.modalHeader}>
            <div className={styles.authorInfo}>
              <img
                src={post.author.avatar || avatarDemo}
                alt={post.author.username}
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
                <img src={user.avatar || avatarDemo} alt="User avatar" />

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
                {comments?.length > 0 &&
                  comments?.map((comment, index) => (
                    <Comment key={index} comment={comment} userId={user.id} />
                  ))}
              </div>
            </div>
            <div className={styles.containerLike}>
              <div className={styles.postFooter}>
                <div className={styles.like}>
                  <img
                    onClick={handleLike}
                    className={styles.icon}
                    src={`${isLike ? heart : like}`}
                    alt="like"
                  />
                  <img className={styles.icon} src={comment} alt="comment" />
                </div>

                <div className={styles.likes}>
                  <span>Likes: {likesCount}</span>
                </div>

                <div className={styles.postFooter}>
                  <span>{post.createdAt}</span>
                </div>
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
      </div>
      {isDialogOpen && (
        <PostDialog
          onClose={closeDialog}
          onDelete={onClose}
          postId={post._id}
          userId={user.id}
          author={post?.author._id}
        />
      )}
    </div>
  );
};

export default PostModal;
