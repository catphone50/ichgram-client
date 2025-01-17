import { useContext } from "react";
import { PostModalContext } from "../PostModalContext/index";
import PostDialog from "../PostDialog/PostDialog";
import styles from "./PostModal.module.css";
import like from "../../assets/icons/like.svg";
import heart from "../../assets/icons/heart.svg";
import comment from "../../assets/icons/comment.svg";
import avatarDemo from "../../assets/icons/benutzer.svg";
import Comment from "../Comment/Comment";

const PostModal = ({ onClose }) => {
  const {
    isDialogOpen,
    commentText,
    post,
    user,
    setCommentText,
    handlePost,
    handleLike,
    handleOptionsClick,
    closeDialog,
  } = useContext(PostModalContext);

  if (!post) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={post.image} alt="Post" className={styles.postImage} />
        <div className={styles.modalInfo}>
          <div className={styles.modalHeader}>
            <div className={styles.authorInfo}>
              <img
                src={post.author?.avatar || avatarDemo}
                alt={post.author.username}
                className={styles.avatar}
              />
              <span className={styles.authorName}>{post.author.username}</span>
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
                <div className={styles.descriptionText}>
                  <p className={styles.postAuthor}>{post.author.username}</p>
                  <p>{post.description}</p>
                </div>
                <div className={styles.descriptionFooter}>
                  <p className={styles.descriptionDate}>{post.date}</p>
                </div>
              </div>

              <div className={styles.comments}>
                {post.comments?.length > 0 &&
                  post.comments?.map((comment) => (
                    <Comment
                      key={comment._id}
                      comment={comment}
                      userId={user.id}
                    />
                  ))}
              </div>
            </div>
            <div className={styles.containerLike}>
              <div className={styles.postFooter}>
                <div className={styles.like}>
                  <img
                    onClick={() => handleLike(post)}
                    className={styles.icon}
                    src={`${
                      post.likes.some((like) => like.user === user.id)
                        ? heart
                        : like
                    }`}
                    alt="like"
                  />
                  <img className={styles.icon} src={comment} alt="comment" />
                </div>

                <div className={styles.likes}>
                  <span>Likes: {post.likes?.length || 0}</span>
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
          author={post.author._id}
        />
      )}
    </div>
  );
};

export default PostModal;

// import { useEffect, useState } from "react";
// import PostDialog from "../PostDialog/PostDialog";
// import styles from "./PostModal.module.css";
// import { useDispatch, useSelector } from "react-redux";
// //import { useNavigate } from "react-router-dom";
// import { addComment } from "../../store/features/comments/commentsActions";
// import Comment from "../Comment/Comment";
// import like from "../../assets/icons/like.svg";
// import heart from "../../assets/icons/heart.svg";
// import comment from "../../assets/icons/comment.svg";
// import { likePost, unlikePost } from "../../store/features/likes/likeActions";
// import avatarDemo from "../../assets/icons/benutzer.svg";
// import { fetchPostsById } from "../../store/features/posts/postActions";

// const PostModal = ({ onClose, post }) => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [isLike, setIsLike] = useState(false);
//   const [likesCount, setLikesCount] = useState(0);

//   // const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.user.user);

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//   };

//   //const newPost = useSelector((state) => state.posts.post);

//   // console.log(newPost);
//   // useEffect(() => {
//   //   const fetchPost = async () => {
//   //     try {
//   //       const resultAction = dispatch(fetchPostsById(post._id));
//   //       if (!fetchPostsById.fulfilled.match(resultAction)) {
//   //         console.error(
//   //           "Updating profile failed:",
//   //           resultAction.payload || resultAction.error
//   //         );
//   //       }
//   //     } catch (error) {
//   //       console.error("Updating profile failed:", error);
//   //     }
//   //   };
//   //   fetchPost();
//   // }, []);

//   useEffect(() => {
//     if (!post) return;
//     setLikesCount(post.likes?.length);
//     if (post.likes.some((like) => like.user === user.id)) setIsLike(true);
//   }, [post, user.id]);

//   // useEffect(() => {
//   //   isOpen && navigate(`post/${post._id}`);
//   // }, [isOpen, navigate, post._id]);

//   const handlePost = () => {
//     const newComment = {
//       userId: user.id,
//       postId: post._id,
//       text: commentText,
//     };

//     dispatch(addComment(newComment));
//     setCommentText("");
//   };

//   const handleLike = () => {
//     if (!post || !user) return;
//     const data = {
//       userId: user.id,
//       postId: post._id,
//     };

//     if (isLike) {
//       dispatch(unlikePost(data));
//       setIsLike(false);
//       setLikesCount(likesCount - 1);
//     } else {
//       dispatch(likePost(data));
//       setIsLike(true);
//       setLikesCount(likesCount + 1);
//     }
//   };

//   const handleOptionsClick = () => {
//     setIsDialogOpen(true);
//   };

//   return (
//     <div className={styles.modalBackdrop} onClick={onClose}>
//       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//         <img src={post.image} alt="Post" className={styles.postImage} />
//         <div className={styles.modalInfo}>
//           <div className={styles.modalHeader}>
//             <div className={styles.authorInfo}>
//               <img
//                 src={post.author?.avatar || avatarDemo}
//                 alt={post.author.username}
//                 className={styles.avatar}
//               />
//               <span className={styles.authorName}>{user.username}</span>
//             </div>
//             <button
//               className={styles.optionsButton}
//               onClick={handleOptionsClick}
//             >
//               ...
//             </button>
//           </div>
//           <div className={styles.modalBody}>
//             <div className={styles.postInfoContainer}>
//               <div className={styles.postDescription}>
//                 <div className={styles.descriptionText}>
//                   <p className={styles.postAuthor}>{post.author.username}</p>
//                   <p>{post.description}</p>
//                 </div>
//                 <div className={styles.descriptionFooter}>
//                   <p className={styles.descriptionDate}>{post.date}</p>
//                 </div>
//               </div>

//               <div className={styles.comments}>
//                 {post.comments?.length > 0 &&
//                   post.comments?.map((comment, index) => (
//                     <Comment key={index} comment={comment} userId={user.id} />
//                   ))}
//               </div>
//             </div>
//             <div className={styles.containerLike}>
//               <div className={styles.postFooter}>
//                 <div className={styles.like}>
//                   <img
//                     onClick={handleLike}
//                     className={styles.icon}
//                     src={`${isLike ? heart : like}`}
//                     alt="like"
//                   />
//                   <img className={styles.icon} src={comment} alt="comment" />
//                 </div>

//                 <div className={styles.likes}>
//                   <span>Likes: {likesCount}</span>
//                 </div>

//                 <div className={styles.postFooter}>
//                   <span>{post.createdAt}</span>
//                 </div>
//               </div>

//               <div className={styles.addComment}>
//                 <input
//                   type="text"
//                   placeholder="Add a comment..."
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                 />
//                 <button
//                   type="submit"
//                   className={styles.postButton}
//                   onClick={handlePost}
//                 >
//                   Post
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isDialogOpen && (
//         <PostDialog
//           onClose={closeDialog}
//           onDelete={onClose}
//           postId={post._id}
//           userId={user.id}
//           author={post?.author._id}
//         />
//       )}
//     </div>
//   );
// };

// export default PostModal;
