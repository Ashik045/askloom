/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Context } from "@/Context/Context";
import noPhoto from "@/public/images/no-photo.png";
import { QuestionType, UserType } from "@/types.global";
import Image from "next/image";
import { useContext, useState } from "react";
import { MdCreate } from "react-icons/md";
import Activity from "../Activity/Activity";
import EditPopup from "../EditPopup/EditPopup";
import Question from "../Question/Question";
import styles from "./profile.module.scss";

interface UserT {
  userr: UserType;
  questions: QuestionType[];
}

function Profile({ userr, questions }: UserT) {
  const date = new Date(userr.createdAt);
  const [activity, setActivity] = useState<string>("questions");
  const [editPopUp, setEditPopUp] = useState(false);

  const { user } = useContext(Context);

  const handlePostOrActivity = (value: string, userId: string) => {
    setActivity(value);
  };

  const handleEditProfile = () => {
    setEditPopUp(true);
  };

  return (
    <div className={styles.profile_main}>
      <div className={styles.profile_main_user}>
        <div className={styles.profile_main_info}>
          <Image
            src={userr.photoUrl ? userr.photoUrl : noPhoto}
            alt="askloom user"
            height={100}
            width={100}
            className={styles.profile_photo}
          />

          <div className={styles.profile_main_in}>
            <div className={styles.profile_name_or_edit}>
              <h1>{userr.displayName}</h1>

              {userr._id === user?._id && (
                <div className={styles.edit_profile}>
                  <p onClick={handleEditProfile}>
                    <MdCreate
                      style={{ marginRight: "3px", fontSize: "18px" }}
                    />
                    Edit profile
                  </p>
                </div>
              )}
            </div>
            <p className={styles.title}>{userr.title}</p>
            <p>Member since {date.toLocaleDateString()}</p>
          </div>

          {/* <p onClick={handleEditProfile}>
              <MdCreate style={{ marginRight: "3px", fontSize: "18px" }} />
              Edit profile
            </p> */}

          {editPopUp && <EditPopup user={userr} setEditPopUp={setEditPopUp} />}
        </div>

        <p style={{ color: "rgb(92, 92, 92)" }}>{userr?.about}</p>

        <div className={styles.user_qna}>
          <nav>
            <p
              className={
                activity === "questions"
                  ? `${styles.active}`
                  : `${styles.notactive}`
              }
              onClick={() => handlePostOrActivity("questions", userr._id)}
            >
              {questions.length}{" "}
              {questions.length > 1 ? "Questions" : "Question"}
            </p>
            <p
              className={
                activity === "comments"
                  ? `${styles.active}`
                  : `${styles.notactive}`
              }
              onClick={() => handlePostOrActivity("comments", userr._id)}
            >
              2 Answers
            </p>
            <p
              className={
                activity === "reacts"
                  ? `${styles.active}`
                  : `${styles.notactive}`
              }
              onClick={() => handlePostOrActivity("reacts", userr._id)}
            >
              2 Reacts
            </p>
          </nav>

          {activity === "questions" ? (
            questions.length === 0 ? (
              <p>{user?.displayName} haven&apos;t created any question yet.</p>
            ) : (
              questions.map((question) => {
                return <Question key={question._id} question={question} />;
              })
            )
          ) : activity === "comments" ? (
            <Activity />
          ) : (
            <>
              <p>This functionality has not completed yet. (Updating..)</p>
              <p>You reacted on example&apos;s question</p>
            </>
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
