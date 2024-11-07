import "react-loading-skeleton/dist/skeleton.css";
import styles from "./loaderstyle.module.scss";
import Questionloading from "./Questionloading";

const HomePageLoading = () => {
  return (
    <div className={styles.homePage_loading}>
      <div className={styles.homePage_loading_tags}>{/* <TagLoading /> */}</div>

      <div className={styles.homePage_loading_questions}>
        <Questionloading />
        <Questionloading />
        <Questionloading />
        <Questionloading />
        <Questionloading />
      </div>

      <div
        style={{ marginBottom: "15px" }}
        className={styles.trending_questions}
      ></div>
    </div>
  );
};

export default HomePageLoading;
