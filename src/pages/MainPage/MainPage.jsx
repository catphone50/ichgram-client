import styles from "./MainPage.module.css";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/features/posts/postActions";
import Post from "../../components/Post/Post";
import Footer from "../../components/Footer";
import { PostModalContext } from "../../components/PostModalContext";
import PostModal from "../../components/PostModal/PostModal";

const MainPage = () => {
  const { isModalOpen, closeModal } = useContext(PostModalContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const {
    posts,
    isLoading: postsLoading,
    error: postsError,
  } = useSelector((state) => state.posts);

  if (postsLoading) return <p>Loading...</p>;
  if (postsError) return <p>Error: {postsError.message}</p>;

  return (
    <>
      <div className={styles.photoGallery}>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p>No photos</p>
        )}
      </div>
      <Footer />
      {isModalOpen && <PostModal onClose={closeModal} />}
    </>
  );
};

export default MainPage;

// import styles from "./MainPage.module.css";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPosts } from "../../store/features/posts/postActions";
// import Post from "../../components/Post/Post";
// import Footer from "../../components/Footer";

// const MainPage = () => {
//   const [posts, setPosts] = useState([]);

//   const {
//     posts: allPosts,
//     isLoading: postsLoading,
//     error: postsError,
//   } = useSelector((state) => state.posts);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchPosts());
//   }, []);

//   useEffect(() => {
//     if (allPosts) {
//       setPosts(allPosts);
//     }
//   }, [allPosts]);

//   if (postsLoading) return <p>Loading...</p>;
//   if (postsError) return <p>Error: {postsError.message}</p>;

//   return (
//     <>
//       <div className={styles.photoGallery}>
//         {posts.length > 0 ? (
//           posts.map((post) => (
//             <Post key={post._id} post={post} goTo={"/home"} />
//           ))
//         ) : (
//           <p>No photos</p>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MainPage;
