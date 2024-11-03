import { UserType } from "@/types.global";
import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import styles from "./likepopup.module.scss";

import nophoto from "@/public/images/no-photo.png";

interface UsersType {
  users: UserType[];
  setLikePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const LikePopup = ({ users, setLikePopup }: UsersType) => {
  const handleClose = () => {
    setLikePopup(false);
  };

  // console.log(users);

  return (
    <div className={styles.like_popup}>
      <div className={styles.like_popup_main}>
        <span onClick={handleClose} className={styles.close_icon}>
          <FaTimes />
        </span>
        <h1>{users.length} Likes </h1>

        {users.map((user) => {
          return (
            <div key={user._id} className={styles.like_users}>
              <Link href={`/profile/${user._id}`}>
                <Image
                  src={user.photoUrl ? user.photoUrl : nophoto}
                  height={37}
                  width={37}
                  alt="sociatek"
                  className={styles.user_profile}
                />
              </Link>

              <div className={styles.like_user_name}>
                <p className={styles.answer_name}>
                  <Link href={`/profile/${user._id}`}>{user.displayName}</Link>
                </p>
                <p className={styles.title}>{user.title}</p>
              </div>

              <button>
                <Link href={`/profile/${user._id}`}>View Profile</Link>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LikePopup;
