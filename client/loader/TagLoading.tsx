import Skeleton from "react-loading-skeleton";
import styles from "./loaderstyle.module.scss";

const TagLoading = () => {
  return (
    <div className={styles.homePage_loading_tagg}>
      <Skeleton height={33} style={{ marginBottom: "15px" }} />
      <div className={styles.homePage_loading_tag}>
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
      </div>
    </div>
  );
};

export default TagLoading;
