/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Context } from "@/Context/Context";
import nophoto from "@/public/images/no-photo.png";
import { QuestionType, UserType } from "@/types.global";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import styles from "./question.module.scss";

import { formatDistanceToNow } from "date-fns";
import LikePopup from "../LikePopup/LikePopup";
import PostAnswer from "../PostAnswer/PostAnswer";

interface QuestionProps {
  question: QuestionType;
}

const Question = ({ question }: QuestionProps) => {
  const [like, setLike] = useState(false);
  const [likePopup, setLikePopup] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [ansComponent, setAnsComponent] = useState(false);
  const [likeCount, setLikeCount] = useState(question.reacts?.length);
  const [timeAgo, setTimeAgo] = useState("");
  const [reactedUsers, setReactedUsers] = useState<UserType[]>([]);

  const { user } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (question && user?._id) {
      const isLiked = question.reacts?.includes(user?._id);

      if (isLiked) {
        setLike(true);
      }
    }
  }, [question, user?._id]);

  const createTime = question.createdAt;
  // Updating the time every minute
  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const createdDate = new Date(createTime); // Convert createdAt to a Date object
      const distance = formatDistanceToNow(createdDate, {
        addSuffix: true,
      });

      setTimeAgo(distance);
    };

    if (createTime) {
      calculateTimeAgo(); // Update the time immediately

      // Update the time every minute (you can adjust the interval as needed)
      const intervalId = setInterval(calculateTimeAgo, 60000);

      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [createTime]);

  if (timeAgo.startsWith("about ")) {
    setTimeAgo(timeAgo.slice(5));
  }

  const handleClick = async (prop: string) => {
    if (likeLoading) {
      return;
    }

    // Set likeLoading to true
    setLikeLoading(true);

    // check if user is authenticated
    const token = localStorage.getItem("jwttoken");

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
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/react/${question._id}`,
          {},
          config
        );

        setLikeCount(likeCount + 1);
        setLike(!like);
        console.log("liked");
      } catch (error) {
        console.log(error);
      }
    } else {
      // add an unlike request
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/unreact/${question._id}`,
          {},
          config
        );
        console.log("unliked");
      } catch (error) {
        console.error(error);
      }
      setLikeCount(likeCount - 1);
      setLike(!like);
    }

    // Set likeLoading to false after the request is completed
    setLikeLoading(false);
  };

  const handleAnsComp = () => {
    setAnsComponent(!ansComponent);
  };

  const handleLikesPopup = async () => {
    setLikePopup(!likePopup);

    try {
      // setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/${question._id}/reacts`
      );
      const users = await res.data.message;

      setReactedUsers(users);

      // setLoading(false);
    } catch (error) {
      console.error(error);
      // setLoading(false);
    }
  };

  return (
    <div className={styles.single_question}>
      <div className={styles.question_user}>
        <Link href={`/profile/${question.userid}`}>
          <Image
            src={question?.userPhoto ? question.userPhoto : nophoto}
            height={37}
            width={37}
            alt="sociatek"
            className={styles.user_profile}
          />
        </Link>

        <div className={styles.post_user_nameandtime}>
          <Link
            href={`/profile/${question.userid}`}
            style={{ textDecoration: "none" }}
          >
            <p className={styles.username}>{question.user}</p>
          </Link>

          <p className={styles.post_date}>
            {question.userTitle} <i>{timeAgo}</i>
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

        {likePopup && question.reacts.length > 0 && (
          <LikePopup users={reactedUsers} setLikePopup={setLikePopup} />
        )}
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
            <span className={styles.likes} onClick={handleLikesPopup}>
              {likeCount}
              {likeCount > 1 ? " Likes" : " Like"}
            </span>
          </p>
          <p>
            <FaRegComment onClick={handleAnsComp} />{" "}
            <span className={styles.comments}>
              <Link href={`/questions/${question._id}`}>
                {question.comments.length}{" "}
                {question.comments.length > 1 ? "Answers" : "Answer"}
              </Link>
            </span>
          </p>
        </div>
      </div>

      {ansComponent && <PostAnswer qid={question._id} />}
    </div>
  );
};

export default Question;
