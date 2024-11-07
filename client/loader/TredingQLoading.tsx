import Skeleton from "react-loading-skeleton";
import styles from "./loaderstyle.module.scss";

const TrendingQLoading = () => {
  return (
    <div className={styles.trending_questionss}>
      <Skeleton height={33} style={{ marginBottom: "15px" }} />
      <Skeleton height={28} />
      <Skeleton height={26} />
      <Skeleton height={30} />
      <Skeleton height={28} />
      <Skeleton height={26} />
      <Skeleton height={28} />
      <Skeleton height={26} />
    </div>
  );
};

export default TrendingQLoading;
