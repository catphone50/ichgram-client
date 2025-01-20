import { createContext, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/features/comments/commentsActions";
import { likePost, unlikePost } from "../../store/features/likes/likeActions";
import {
  fetchPosts,
  fetchPostsById,
} from "../../store/features/posts/postActions";
import { useNavigate, useParams } from "react-router-dom";
import { getUserWithPosts } from "../../store/features/profile/profileActions";
import {
  fetchFollowing,
  followUser,
  unfollowUser,
} from "../../store/features/follow/followActions";

const PostModalContext = createContext();

const PostModalProvider = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [postsCount, setPostsCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [isUserAlreadyFollowed, setIsUserAlreadyFollowed] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postParamsId } = useParams();
  const postRef = useRef(null);
  const id = useParams().id;

  const user = useSelector((state) => state.user.user);
  const post = useSelector((state) => state.posts.post);
  const profile = useSelector((state) => state.profile.user);

  //console.log("profile", profile);
  //post && console.log("post", post);

  useEffect(() => {
    if (postParamsId) {
      setSelectedPostId(postParamsId);
    }
    if (post) {
      setSelectedPostId(post._id);
      checkIfUserIsFollowed(post.author._id);
    }
  }, [postParamsId, post]);

  useEffect(() => {
    setPostsCount(profile.posts?.length);
    setFollowingCount(profile.following?.length);
    setFollowersCount(profile.followers?.length);
  }, [
    profile.posts?.length,
    profile.following?.length,
    profile.followers?.length,
  ]);

  useEffect(() => {
    if (!selectedPostId) return;

    const fetchPostData = async () => {
      try {
        const result = await dispatch(fetchPostsById(selectedPostId));
        if (!fetchPostsById.fulfilled.match(result)) {
          console.error(
            "Ошибка загрузки поста:",
            result.payload || result.error
          );
        }
      } catch (error) {
        console.error("Ошибка загрузки поста:", error);
      }
    };

    fetchPostData();
  }, [selectedPostId, dispatch]);

  const checkIfUserIsFollowed = async (targetUserId) => {
    if (!targetUserId) return;
    if (targetUserId === user.id) return;
    try {
      const response = await dispatch(fetchFollowing(user.id));
      if (!response.payload) {
        console.error("Invalid response or payload from fetchFollowing");
      }
      const followingList = response.payload;

      const isFollowed = followingList?.some((following) => {
        return following?.following?._id === targetUserId;
      });

      setIsUserAlreadyFollowed(Boolean(isFollowed));
    } catch (error) {
      console.error("Error checking if user is followed:", error);
    }
  };

  const handlePost = async () => {
    if (!commentText.trim()) return;

    const newComment = {
      userId: user.id,
      postId: post._id,
      text: commentText.trim(),
    };

    try {
      await dispatch(addComment(newComment));
      setCommentText(""); // Очистка только при успешной операции
      if (isModalOpen) {
        await dispatch(fetchPostsById(selectedPostId));
      } else {
        await dispatch(fetchPosts());
      }
    } catch (error) {
      console.error("Ошибка добавления комментария:", error);
    }
  };

  const isLikedByUser = (post, userId) =>
    post?.likes?.some((like) => like.user === userId);

  const toggleLike = async (post) => {
    if (!post || !user) return;

    const data = { userId: user.id, postId: post._id };

    try {
      if (isLikedByUser(post, user.id)) {
        await dispatch(unlikePost(data));
      } else {
        await dispatch(likePost(data));
      }
      // Обновление только текущего поста
      if (isModalOpen) {
        await dispatch(fetchPostsById(selectedPostId));
      } else {
        await dispatch(fetchPosts());
        await dispatch(getUserWithPosts(id));
      }
    } catch (error) {
      console.error("Ошибка обработки лайка:", error);
    }
  };

  const toggleFollow = async (followingId) => {
    if (!followingId) return;

    const data = { followerId: user.id, followingId: followingId };

    try {
      if (isUserAlreadyFollowed) {
        await dispatch(unfollowUser(data));
      } else {
        await dispatch(followUser(data));
      }
      checkIfUserIsFollowed(followingId);
      if (isModalOpen) {
        await dispatch(fetchPostsById(selectedPostId));
      } else {
        await dispatch(fetchPosts());
        await dispatch(getUserWithPosts(id));
      }
    } catch (error) {
      console.error("Ошибка обработки follow:", error);
    }
  };

  const handleFollow = (followingId) => {
    toggleFollow(followingId);
  };

  const handleLike = (post) => {
    toggleLike(post);
  };

  const handleOptionsClick = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = async () => {
    setIsDialogOpen(false);
    await dispatch(fetchPosts());
  };

  const handlePostSelect = (post) => {
    postRef.current = post;
    setSelectedPostId(post._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPostId(null);
    navigate(-1);
  };

  const handleDescriptionToggle = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <PostModalContext.Provider
      value={{
        isDialogOpen,
        commentText,
        post,
        user,
        setCommentText,
        handlePost,
        handleLike,
        handleOptionsClick,
        closeDialog,
        selectedPostId,
        handlePostSelect,
        isModalOpen,
        closeModal,
        isDescriptionExpanded,
        handleDescriptionToggle,
        postsCount,
        handleFollow,
        followersCount,
        followingCount,
        isUserAlreadyFollowed,
        setIsUserAlreadyFollowed,
        checkIfUserIsFollowed,
      }}
    >
      {children}
    </PostModalContext.Provider>
  );
};

export { PostModalContext, PostModalProvider };
