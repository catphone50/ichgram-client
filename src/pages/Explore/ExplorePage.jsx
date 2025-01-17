import styles from "./ExplorePage.module.css";
import { useContext, useEffect, useRef, useCallback, useState } from "react";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import AllUpdates from "../../components/AllUpdates";
import PostModal from "../../components/PostModal/PostModal";
import { PostModalContext } from "../../components/PostModalContext";
import { fetchPostsByLikesAndLimit } from "../../store/features/posts/postActions";
import Content from "../../components/Content";

const ExplorePage = () => {
  const { isModalOpen, closeModal } = useContext(PostModalContext);
  const dispatch = useDispatch();
  const loader = useRef(null);
  const [postList, setPostList] = useState([]);

  const {
    posts,
    isLoading: postsLoading,
    error: postsError,
  } = useSelector((state) => state.posts);

  // console.log("PostList:", postList);

  const observerOptions = {
    root: null,
    rootMargin: "10px",
    threshold: 0.1,
  };

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        const fetchMorePosts = async () => {
          const response = await dispatch(
            fetchPostsByLikesAndLimit({
              start: postList.length + 1,
              end: postList.length + 3,
            })
          );
          setPostList((prevPosts) => [...prevPosts, ...response.payload]);
        };

        fetchMorePosts();
      }
    },
    [dispatch, postList.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, observerOptions);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [handleObserver]);

  if (postsLoading && posts.length === 0) return <p>Loading...</p>;
  if (postsError) return <p>Error: {postsError.message}</p>;

  return (
    <>
      <div className={styles.photoGallery}>
        {postList.length > 0 ? (
          postList.map((post) => <Content key={post._id} post={post} />)
        ) : (
          <p>No photos</p>
        )}
        <div
          ref={loader}
          style={{
            height: "1px",
            width: "100%",
          }}
        />
      </div>

      <AllUpdates />
      <Footer />
      {isModalOpen && <PostModal onClose={closeModal} />}
    </>
  );
};

export default ExplorePage;
