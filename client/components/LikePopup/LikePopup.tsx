import { FaTimes } from "react-icons/fa";
import styles from "./likepopup.module.scss";

interface UsersType {
  users: UsersType[];
  setEditPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const LikePopup = ({ users, setEditPopUp }: UsersType) => {
  const handleClose = () => {
    setEditPopUp(false);
  };

  console.log(users);

  return (
    <div className={styles.like_popup}>
      <div className={styles.like_popup_main}>
        <span onClick={handleClose} className={styles.close_icon}>
          <FaTimes />
        </span>

        <p>reactors</p>
      </div>
    </div>
  );
};

export default LikePopup;
