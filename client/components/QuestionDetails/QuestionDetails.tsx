/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Context } from "@/Context/Context";
import { QuestionType } from "@/types.global";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import styles from "./questionDetails.module.scss";

interface QuestionDetailsProps {
  question: QuestionType;
}

export default function QuestionDetails({ question }: QuestionDetailsProps) {
  const [like, setLike] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(question.reacts?.length);
  const [timeAgo, setTimeAgo] = useState("");

  const { user } = useContext(Context);
  const router = useRouter();

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

  useEffect(() => {
    if (question && user?._id) {
      const isLiked = question.reacts?.includes(user?._id);

      if (isLiked) {
        setLike(true);
      }
    }

    console.log(question);
  }, [question, user?._id]);

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
          `http://localhost:4000/api/question/react/${question._id}`,
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
          `http://localhost:4000/api/question/unreact/${question._id}`,
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

  const handleEdit = () => {
    router.push(`/questions/${question._id}/edit`);
  };

  const date = new Date(question.createdAt);

  return (
    <div className={styles.questiondetails_component}>
      <h2>{question.title}</h2>

      <div className={styles.questiondetails_user_time}>
        <div className={styles.question_user_time}>
          <Link
            href={`/user/${question.user}`}
            style={{ textDecoration: "none" }}
          >
            <p>
              Asked by{" "}
              <span className={styles.user_name}> {question.user}</span>,
            </p>
          </Link>
          <p>
            <span style={{ fontSize: "16px" }}> {timeAgo}</span>,
          </p>
          <p className={styles.q_cmnt}> {question.comments.length} comments</p>
        </div>

        <div className={styles.question_upd_del}>
          <p onClick={handleEdit}>Edit</p>
          <p>Delete</p>
        </div>
      </div>

      <div className={styles.post_like_line}></div>

      <div
        className={styles.q_question}
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></div>

      <div className={styles.question_tags}>
        {question.tags?.map((tag) => (
          <span key={tag} className={styles.question_tag}>
            {tag}
          </span>
        ))}
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
            {likeCount}
            {likeCount > 1 ? " Likes" : " Like"}
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

      <div className={styles.post_like_line}></div>

      <div className={styles.question_comments}>
        <h3 className={styles.q_cmnt}>{question.comments.length} comments</h3>

        <p>comment 1</p>
        <p>comment 2</p>
        <p>comment 3</p>
        <p>comment 4</p>
      </div>
    </div>
  );
}
