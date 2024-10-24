/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import noPhoto from "@/public/images/no-photo.png";
import { QuestionType, UserType } from "@/types.global";
import Image from "next/image";
import { useState } from "react";
import Activity from "../Activity/Activity";
import Question from "../Question/Question";
import styles from "./profile.module.scss";

interface UserT {
  user: UserType;
  questions: QuestionType[];
}

function Profile({ user, questions }: UserT) {
  const date = new Date(user.createdAt);
  const [activity, setActivity] = useState<string>("questions");

  const handlePostOrActivity = (value: string, userId: string) => {
    setActivity(value);
  };

  return (
    <div className={styles.profile_main}>
      <div className={styles.profile_main_user}>
        <div className={styles.profile_main_info}>
          <Image
            src={user.photoUrl ? user.photoUrl : noPhoto}
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
            <p
              className={
                activity === "questions"
                  ? `${styles.active}`
                  : `${styles.notactive}`
              }
              onClick={() => handlePostOrActivity("questions", user._id)}
            >
              1 Question
            </p>
            <p
              className={
                activity === "comments"
                  ? `${styles.active}`
                  : `${styles.notactive}`
              }
              onClick={() => handlePostOrActivity("comments", user._id)}
            >
              2 Comments
            </p>
            <p
              className={
                activity === "reacts"
                  ? `${styles.active}`
                  : `${styles.notactive}`
              }
              onClick={() => handlePostOrActivity("reacts", user._id)}
            >
              2 Reacts
            </p>
          </nav>

          {activity === "questions" ? (
            questions.map((question) => {
              return <Question key={question._id} question={question} />;
            })
          ) : activity === "comments" ? (
            <Activity />
          ) : (
            <p>Reacts</p>
          )}
        </div>
      </div>

      <div className={styles.trending_questions}>
        <h1>trending questions</h1>
      </div>
    </div>
  );
}

export default Profile;
