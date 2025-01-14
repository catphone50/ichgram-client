import styles from "./MainPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/features/posts/postActions";
import Post from "../../components/Post/Post";

const MainPage = () => {
  const [posts, setPosts] = useState([]);

  const {
    posts: allPosts,
    isLoading: postsLoading,
    error: postsError,
  } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (allPosts) {
      setPosts(allPosts);
    }
  }, [allPosts]);

  if (postsLoading) return <p>Loading...</p>;
  if (postsError) return <p>Error: {postsError.message}</p>;

  return (
    <div className={styles.photoGallery}>
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} goTo={"/home"} />)
      ) : (
        <p>No photos</p>
      )}
    </div>
  );
};

export default MainPage;
