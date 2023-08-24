import { useEffect, useState } from "react";

import { Comment, Loader } from "../components";
import { getPosts } from "../api";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      // console.log(response);

      if (response.success) {
        setPosts(response.data);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                alt="user-pic"
              />
              <div>
                <Link
                  to={`/user/${post.user._id}`}
                  className={styles.postAuthor}>
                  {post.user.username}
                </Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                {/* <img
                  src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                  alt="likes-icon"
                /> */}
                <i className="fa-regular fa-heart"></i>
                <span>{post.likes.length}</span>
              </div>

              <div className={styles.postCommentsIcon}>
                {/* <img
                  src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                  alt="comments-icon"
                /> */}
                <i className="fa-regular fa-comment"></i>
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
