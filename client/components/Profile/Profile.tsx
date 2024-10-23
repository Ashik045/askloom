import { UserType } from "@/types.global";
import Image from "next/image";
import styles from "./profile.module.scss";

interface UserT {
  user: UserType;
}

function Profile({ user }: UserT) {
  const date = new Date(user.createdAt);

  return (
    <div className={styles.profile_main}>
      <div className={styles.profile_main_user}>
        <div className={styles.profile_main_info}>
          <Image
            src={user.photoUrl}
            alt="askloom user"
            height={100}
            width={100}
            className={styles.profile_photo}
          />

          <div className={styles.profile_main_in}>
            <h1>{user.displayName}</h1>
            <p className={styles.title}>{user.about}</p>
            <p>Member since {date.toLocaleDateString()}</p>
          </div>
        </div>

        <p style={{ color: "rgb(92, 92, 92)" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla nam
          eligendi quia repellendus, eum amet harum? Sequi, fugit sed
          reiciendis, ex nesciunt excepturi reprehenderit eum, porro corporis
          cumque accusamus in!
        </p>

        <div className={styles.user_qna}>
          <nav>
            <p>1 Question</p>
            <p>2 Comments</p>
            <p>2 Reacts</p>
          </nav>
        </div>
      </div>

      <div className={styles.profile_main_user}>
        <h1>trending questions</h1>
      </div>
    </div>
  );
}

export default Profile;
