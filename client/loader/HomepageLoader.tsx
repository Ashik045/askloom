import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./loaderstyle.module.scss";
import Questionloading from "./Questionloading";

const HomePageLoading = () => {
  return (
    <div className={styles.homePage_loading}>
      <div className={styles.homePage_loading_tags}>
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
      </div>

      <div className={styles.homePage_loading_questions}>
        <Questionloading />
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

export default HomePageLoading;
