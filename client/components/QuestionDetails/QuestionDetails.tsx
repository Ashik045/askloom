"use client";

import { QuestionType } from "@/types.global";
import Link from "next/link";
import { useState } from "react";
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import styles from "./questionDetails.module.scss";

interface QuestionDetailsProps {
  question: QuestionType;
}

export default function QuestionDetails({ question }: QuestionDetailsProps) {
  const [like, setLike] = useState(false);

  const handleClick = () => {
    setLike(!like);
  };
  const date = new Date(question.createdAt);

  return (
    <div className={styles.questiondetails_component}>
      <h2>{question.title}</h2>

      <div className={styles.questiondetails_user_time}>
        <Link
          href={`/user/${question.user}`}
          style={{ textDecoration: "none" }}
        >
          <p>
            Asked by <span className={styles.user_name}> {question.user}</span>
          </p>
        </Link>
        <p>{date.toLocaleDateString()}</p>
        <p className={styles.q_cmnt}> {question.comments.length} comments</p>
      </div>

      <div className={styles.post_like_line}></div>

      <p className={styles.q_question}>{question.question}</p>

      <div className={styles.question_tags}>
        {question.tags.map((tag) => (
          <span key={tag} className={styles.question_tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.add_like_cmnt}>
        <p>
          {like ? (
            <FaRegThumbsUp
              className={styles.unlike_icon}
              onClick={handleClick}
            />
          ) : (
            <FaThumbsUp className={styles.unlike_icon} onClick={handleClick} />
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
