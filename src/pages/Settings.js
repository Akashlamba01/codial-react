import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";

const Settings = () => {
  const auth = useAuth();

  const [editTogle, setEditTogle] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(
    auth.user.username ? auth.user.username : ""
  );

  const clearForm = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async () => {
    auth.loading = true;
    // e.preventdefault();

    // console.log(auth.user);

    const response = await auth.editUser(
      auth.user.email,
      password,
      confirmPassword,
      username
    );

    console.log(response);

    if (response.success) {
      console.log(response.data);
      clearForm();

      auth.loading = false;

      return;
    } else {
      console.error(response.message);
      auth.loading = false;
      return;
    }
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
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editTogle ? (
          <div className={styles.field}>
            <input
              type="text"
              value={username}
              placeholder={auth.user?.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : (
          <div className={styles.fieldValue}>{auth.user?.username}</div>
        )}
      </div>

      {editTogle ? (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      ) : (
        ""
      )}

      <div className={styles.btnGrp}>
        {editTogle ? (
          <div>
            <button
              className={`button ${styles.editBtn}`}
              style={{ marginRight: 20 }}
              onClick={handleSubmit}>
              save
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditTogle(false)}>
              Go back
            </button>
          </div>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditTogle(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
