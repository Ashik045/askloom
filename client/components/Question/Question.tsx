"use client";
import { Context } from "@/Context/Context";
import nophoto from "@/public/images/no-photo.png";
import { QuestionType } from "@/types.global";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import styles from "./question.module.scss";

interface QuestionProps {
  question: QuestionType;
}

const Question = ({ question }: QuestionProps) => {
  const [like, setLike] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(question.reacts?.length);

  const { user } = useContext(Context);
  const router = useRouter();

  const handleClick = async (prop: string) => {
    if (likeLoading) {
      return;
    }

    // Set likeLoading to true
    setLikeLoading(true);

    // check if user is authenticated
    const token = localStorage.getItem("jwtToken");

    if (!user) {
      router.push("/login");
      setLikeLoading(false); // Set likeLoading to false to enable handling likes again
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (prop === "like" && !like) {
      try {
        // add a like request
        const response = await axios.post(
          `https://sociatek.onrender.com/api/post/like/${question._id}`,
          {},
          config
        );

        setLikeCount(likeCount + 1);
        setLike(!like);
      } catch (error) {
        console.log(error);
      }
    } else {
      // add an unlike request
      try {
        const response = await axios.post(
          `https://sociatek.onrender.com/api/post/unlike/${question._id}`,
          {},
          config
        );
      } catch (error) {
        console.error(error);
      }
      setLikeCount(likeCount - 1);
      setLike(!like);
    }

    // Set likeLoading to false after the request is completed
    setLikeLoading(false);
  };

  return (
    <div className={styles.single_question}>
      <div className={styles.question_user}>
        <Link href={`/user/${question.user}}`}>
          <Image
            src={nophoto}
            height={37}
            width={37}
            alt="sociatek"
            className={styles.user_profile}
          />
        </Link>

        <div className={styles.post_user_nameandtime}>
          <Link
            href={`/user/${question.user}`}
            style={{ textDecoration: "none" }}
          >
            <p className={styles.username}>{question.user}</p>
          </Link>

          <p className={styles.post_date}>
            {question.userTitle} <i>5min ago</i>
          </p>
        </div>
      </div>

      <div className={styles.question_body}>
        <h2 className={styles.question_title}>
          <Link href={`/questions/${question._id}`}> {question.title}</Link>
        </h2>

        <div className={styles.question_text}>
          <div
            className={styles.question_q}
            dangerouslySetInnerHTML={{ __html: question.question }}
          ></div>

          <a
            href={`/questions/${question._id}`}
            className={styles.view_more_btn}
          >
            View More
          </a>
        </div>

        <div className={styles.add_like_cmnt}>
          <p>
            {like ? (
              <FaThumbsUp
                className={styles.unlike_icon}
                onClick={() => handleClick("dislike")}
              />
            ) : (
              <FaRegThumbsUp
                className={styles.unlike_icon}
                onClick={() => handleClick("like")}
              />
            )}
            <span className={styles.likes}>
              {question.reacts.length}{" "}
              {question.reacts.length > 1 ? "Likes" : "Like"}
            </span>
          </p>
          <p>
            <FaRegComment />{" "}
            <span className={styles.comments}>
              {question.comments.length}{" "}
              {question.comments.length > 1 ? "Comments" : "Comment"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Question;
