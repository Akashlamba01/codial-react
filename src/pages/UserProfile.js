import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../styles/settings.module.css";
import { useEffect, useState } from "react";
import { Loader } from "../components";
import { createFriend, removeFriend, userProfileInfo } from "../api";
import { useAuth } from "../hooks";

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState([]);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const auth = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await userProfileInfo(userId);
      if (response.success) {
        setUser(response.data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  console.log(auth.user);

  const checkFriend = () => {};
  checkFriend();

  const handleAddFriend = async () => {
    setRequestInProgress(true);

    const response = await createFriend(userId);

    if (response.success) {
      auth.updateUserFriends(response.data.friends);
      console.log("add friend success!");
    } else {
      console.log("Error to add friend!");
    }

    setRequestInProgress(false);
  };

  const handleRemoveFriend = async () => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);

    if (response.success) {
      auth.updateUserFriends(response.data.friends);
      console.log("remove frined!");
    } else {
      console.log("error to remove frined");
    }

    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.username}</div>
      </div>

      <div className={styles.btnGrp}>
        <button
          className={`button ${styles.editBtn}`}
          onClick={handleRemoveFriend}>
          remove friend
        </button>

        <button
          className={`button ${styles.editBtn}`}
          onClick={handleAddFriend}>
          add friend
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
