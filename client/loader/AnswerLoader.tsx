import Skeleton from "react-loading-skeleton";
import styles from "./loaderstyle.module.scss";

const AnswerLoader = () => {
  return (
    <div className={styles.answer_loading} style={{ padding: "10px" }}>
      <div className={styles.answer_loading} style={{ marginTop: "15px" }}>
        <Skeleton height={28} />
        <Skeleton height={25} />
      </div>

      <div className={styles.answer_loading} style={{ marginTop: "15px" }}>
        <Skeleton height={28} />
        <Skeleton height={25} />
      </div>

      <div className={styles.answer_loading} style={{ marginTop: "15px" }}>
        <Skeleton height={26} />
        <Skeleton height={19} />
      </div>
    </div>
  );
};

export default AnswerLoader;
