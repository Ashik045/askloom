import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./loaderstyle.module.scss";
import Questionloading from "./Questionloading";

const UserProfileLoading = () => {
  return (
    <div className={styles.userPage_loading}>
      <div className={styles.userPage_loading_q}>
        <Skeleton height={115} />
        <Skeleton
          height={20}
          style={{ marginTop: "15px", marginBottom: "1px" }}
        />
        <Skeleton height={20} style={{ marginBottom: "15px" }} />

        <Skeleton height={40} style={{ marginBottom: "20px" }} />

        <Questionloading />
        <Questionloading />
        <Questionloading />
      </div>

      <div
        style={{ marginBottom: "15px" }}
        className={styles.trending_questions}
      >
        <Skeleton height={33} style={{ marginBottom: "15px" }} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
      </div>
    </div>
  );
};

export default UserProfileLoading;
