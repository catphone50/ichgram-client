import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Post.module.css";
import avatarDemo from "../../assets/icons/benutzer.svg";
import like from "../../assets/icons/like.svg";
import heart from "../../assets/icons/heart.svg";
import comment from "../../assets/icons/comment.svg";
import { PostModalContext } from "../PostModalContext";

const Post = ({ post }) => {
  const {
    user,
    handlePostSelect,
    isDescriptionExpanded,
    handleDescriptionToggle,
    handleLike,
  } = useContext(PostModalContext);

  const navigate = useNavigate();

  const openModal = () => {
    handlePostSelect(post);
    navigate(`post/${post._id}`);
  };

  return (
    <>
      <div className={styles.post}>
        <div className={styles.header}>
          <img
            src={post.author?.avatar || avatarDemo}
            alt="User avatar"
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <span className={styles.username}>{post.author.username}</span>
            <span className={styles.timeAgo}>
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
          <button className={styles.followBtn}>Follow</button>
        </div>

        <div className={styles.photo} onClick={openModal}>
          <img
            width={300}
            src={post.image || ""}
            alt="User post"
            className={styles.photoImage}
          />
        </div>

        <div className={styles.like}>
          <img
            onClick={() => handleLike(post)}
            className={styles.icon}
            src={`${
              post.likes.some((like) => like.user === user.id) ? heart : like
            }`}
            alt="like"
          />
          <img className={styles.icon} src={comment} alt="comment" />
        </div>

        <div className={styles.likes}>
          <span>Likes: {post.likes?.length || 0}</span>
        </div>

        <div className={styles.footer}>
          <p className={styles.description}>
            {post.description.length > 70 ? (
              <>
                {isDescriptionExpanded
                  ? post.description
                  : post.description.slice(0, 70) + "..."}
                <button
                  onClick={handleDescriptionToggle}
                  className={styles.toggleDescription}
                >
                  {isDescriptionExpanded ? "Less" : "More"}
                </button>
              </>
            ) : (
              post.description
            )}
          </p>
          <div className={styles.stats}>
            {post.comments?.length > 0 &&
              post.comments?.slice(0, 2).map((comment, index) => (
                <div key={index} className={styles.comment}>
                  <img
                    src={comment.user?.avatar || avatarDemo}
                    alt="User avatar"
                    className={styles.commentAvatar}
                  />
                  <p>{comment.text}</p>
                </div>
              ))}
          </div>
          <button className={styles.commentBtn} onClick={openModal}>
            {post.comments.length > 0
              ? `View all comments ${post.comments.length}`
              : "No more comments, click to write one"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;

// import { useEffect, useState } from "react";
// import styles from "./Post.module.css";
// import PostModal from "../PostModal/PostModal";
// import { useNavigate } from "react-router-dom";
// import avatarDemo from "../../assets/icons/benutzer.svg";
// import like from "../../assets/icons/like.svg";
// import heart from "../../assets/icons/heart.svg";
// import comment from "../../assets/icons/comment.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { likePost, unlikePost } from "../../store/features/likes/likeActions";
// //import PostModalComponent from "../PostModalComponent";
// import { PostModalProvider } from "../PostModalContext";

// const Post = ({ post }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLike, setIsLike] = useState(false);
//   const [likesCount, setLikesCount] = useState(0);
//   const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.user.user);

//   const handleDescriptionToggle = () => {
//     setDescriptionExpanded(!isDescriptionExpanded);
//   };

//   const isDescriptionLong = post.description.length > 70;
//   const truncatedDescription =
//     post.description.slice(0, 70) + (isDescriptionLong ? "..." : "");

//   const openModal = (postId) => {
//     console.log(postId);
//     navigate(`post/${postId}`);
//     localStorage.setItem("modal", JSON.stringify({ postId }));
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     console.log("Closing modal...");
//     setIsModalOpen(false);
//     navigate(-1);
//     localStorage.removeItem("modal");
//   };

//   // useEffect(() => {
//   //   const data = JSON.parse(localStorage.getItem("modal"));
//   //   console.log(data.postId);
//   //   if (data) openModal(data.postId);
//   // }, []);

//   useEffect(() => {
//     setLikesCount(post.likes.length);
//     if (post.likes.some((like) => like.user === user.id)) setIsLike(true);
//   }, []);

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

//   return (
//     <>
//       <div className={styles.post}>
//         <div className={styles.header}>
//           <img
//             src={post.author.avatar || avatarDemo}
//             alt="User avatar"
//             className={styles.avatar}
//           />
//           <div className={styles.userInfo}>
//             <span className={styles.username}>{post.author.username}</span>
//             <span className={styles.timeAgo}>
//               {new Date(post.createdAt).toLocaleString()}
//             </span>
//           </div>
//           <button className={styles.followBtn}>Follow</button>
//         </div>

//         <div className={styles.photo} onClick={() => openModal(post._id)}>
//           <img
//             width={300}
//             src={post.image || ""}
//             alt="User post"
//             className={styles.photoImage}
//           />
//         </div>

//         <div className={styles.like}>
//           <img
//             onClick={handleLike}
//             className={styles.icon}
//             src={`${isLike ? heart : like}`}
//             alt="like"
//           />
//           <img className={styles.icon} src={comment} alt="comment" />
//         </div>

//         <div className={styles.likes}>
//           <span>Likes: {likesCount}</span>
//         </div>

//         <div className={styles.footer}>
//           <p className={styles.description}>
//             {isDescriptionLong ? (
//               <>
//                 {isDescriptionExpanded
//                   ? post.description
//                   : truncatedDescription}
//                 <button
//                   onClick={handleDescriptionToggle}
//                   className={styles.toggleDescription}
//                 >
//                   {isDescriptionExpanded ? "Less" : "More"}
//                 </button>
//               </>
//             ) : (
//               post.description
//             )}
//           </p>
//           <div className={styles.stats}>
//             {post.comments?.length > 0 &&
//               post.comments?.slice(0, 2).map((comment, index) => (
//                 <div key={index} className={styles.comment}>
//                   <img
//                     src={comment.user?.avatar || avatarDemo}
//                     alt="User avatar"
//                     className={styles.commentAvatar}
//                   />
//                   <p>{comment.text}</p>
//                 </div>
//               ))}
//           </div>
//           <button
//             className={styles.commentBtn}
//             onClick={() => openModal(post._id)}
//           >
//             {post.comments.length > 0
//               ? `View all comments ${post.comments.length}`
//               : "No more comments, click to write one"}
//           </button>
//         </div>
//       </div>

//       {isModalOpen && (
//         <PostModalProvider postId={post._id}>
//           {" "}
//           <PostModal />
//         </PostModalProvider>
//       )}
//     </>
//   );
// };

// export default Post;
