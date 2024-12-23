import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./loaderstyle.module.scss";

const QuestionDetailLoading = () => {
  return (
    <div className={styles.questionDetailLoading}>
      <div className={styles.questionDetailLoading_q}>
        <Skeleton height={38} />
        <Skeleton
          height={22}
          style={{ marginTop: "10px", marginBottom: "20px" }}
        />
        <Skeleton height={300} style={{ marginBottom: "20px" }} />
        <Skeleton height={30} style={{ marginBottom: "5px" }} />
        <Skeleton height={45} style={{ marginBottom: "5px" }} />
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

export default QuestionDetailLoading;
