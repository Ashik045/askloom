import noPhoto from "@/public/images/no-photo.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./answercomponent.module.scss";

interface AnsType {
  answer: {
    answer: string;
    userid: string;
    username: string;
    userphoto: string;
  };
}

const AnswerComponent = ({ answer }: AnsType) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      // Get the line height and calculate the maximum height for 2 lines
      const lineHeight = parseFloat(
        getComputedStyle(textRef.current).lineHeight || "20"
      );
      const maxHeight = lineHeight * 2;

      // Show the "View More" button only if the text height exceeds 2 lines
      setShowButton(textRef.current.scrollHeight > maxHeight);
    }
  }, [answer.answer]);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.answer_comp}>
      <div className={styles.post_like_line}></div>

      <div className={styles.answer_comp_main}>
        <Link href={`/profile/${answer.userid}`}>
          <Image
            className={styles.profilePic}
            src={answer.userphoto ? answer.userphoto : noPhoto}
            height={35}
            width={35}
            alt="askloom profile"
          />
        </Link>

        <div className={styles.answer_comp_userd}>
          <div className={styles.answer_name_time}>
            <p className={styles.answer_name}>
              <Link href={`/profile/${answer.userid}`}> {answer.username}</Link>
              ,{" "}
            </p>
            <p style={{ marginLeft: "3px" }}>
              {" "}
              <i> 5 minutes ago</i>
            </p>
          </div>

          <p
            ref={textRef}
            className={`${styles.full_answer} ${
              isExpanded ? styles.expanded : styles.clamped
            }`}
          >
            {answer.answer}
          </p>

          {showButton && (
            <button onClick={toggleReadMore} className={styles.readMoreBtn}>
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerComponent;
