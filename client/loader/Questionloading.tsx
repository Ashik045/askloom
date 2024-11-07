import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./loaderstyle.module.scss";

const Questionloading = () => {
  return (
    <div style={{ marginTop: "15px" }} className={styles.single_question}>
      <div>
        <Skeleton height={38} />
        <Skeleton
          height={22}
          style={{ marginTop: "10px", marginBottom: "2px" }}
        />
        <Skeleton height={75} style={{ marginBottom: "5px" }} />
        <Skeleton height={25} />
      </div>
    </div>
  );
};

export default Questionloading;
