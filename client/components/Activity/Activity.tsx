import Link from "next/link";
import { FaThumbsUp } from "react-icons/fa";
import styles from "./activity.module.scss";

const Activity = () => {
  return (
    <div className={styles.activity_comp}>
      <div className={styles.activity}>
        <Link
          href={`/post/`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <p className={styles.post_text}> Comment Title</p>
        </Link>

        <div className={styles.like_icon_div}>
          <FaThumbsUp className={styles.like_icon} />

          <p className={styles.post_userrr}>You reacted your post .</p>
        </div>
      </div>
      <div className={styles.post_like_line}></div>
    </div>
  );
};

export default Activity;
