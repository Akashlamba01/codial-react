import styles from "../styles/settings.module.css";

const UserProfile = () => {
  const user = {};

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
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.username}</div>
      </div>

      <div className={styles.btnGrp}>
        <button className={`button ${styles.editBtn}`}>add friend</button>
        <button className={`button ${styles.editBtn}`}>remove friend</button>
      </div>
    </div>
  );
};

export default UserProfile;
