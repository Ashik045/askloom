import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./loaderstyle.module.scss";

const QuestionDetailLoading = () => {
  return (
    <div
      className={styles.questionDetailLoading}
      style={{
        display: "grid",
        gridTemplateColumns: "70% 20%",
        gridGap: "20px",
      }}
    >
      <div>
        <Skeleton height={38} />
        <Skeleton
          height={22}
          style={{ marginTop: "10px", marginBottom: "20px" }}
        />
        <Skeleton height={300} style={{ marginBottom: "20px" }} />
        <Skeleton height={30} style={{ marginBottom: "5px" }} />
        <Skeleton height={45} style={{ marginBottom: "5px" }} />
      </div>
      <div style={{ marginTop: "15px", marginBottom: "25px" }}>
        Trending question
      </div>
    </div>
  );
};

export default QuestionDetailLoading;
