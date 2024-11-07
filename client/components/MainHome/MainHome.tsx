"use client";

import { Context } from "@/Context/Context";
import { useTag } from "@/TagContext/TagContext";
import { QuestionType } from "@/types.global";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import Question from "../Question/Question";
import QuestionComponent from "../QuestionComponent/QuestionComponent";
import styles from "./mainhome.module.scss";

interface QuestionProp {
  questions: QuestionType[];
}

const MainHome = ({ questions }: QuestionProp) => {
  const router = useRouter();
  const { dispatch } = useContext(Context);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const { tagVal, setTagVal } = useTag();

  const filteredQuestions = tagVal
    ? questions.filter((question) => question.tags.includes(tagVal))
    : questions;

  // logout the user and remove jwttoken if the user expire the expiration time
  const token =
    typeof window !== "undefined" && localStorage.getItem("jwttoken");
  if (token) {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    const expirationTime = decodedToken.exp * 1000;

    if (Date.now() > expirationTime) {
      localStorage.removeItem("jwttoken");
      dispatch({ type: "LOGOUT" });
      router.push("/");
    }
  }
  return (
    <div className={styles.main_home}>
      {tagVal ? (
        <p className={styles.tag_text}>
          Questions about tag
          <span>
            {tagVal}{" "}
            <FaTimes
              onClick={() => setTagVal("")}
              className={styles.tag_text_icon}
            />
          </span>
        </p>
      ) : searchTerm ? (
        <p className={styles.tag_text_res}>
          {filteredQuestions.length === 0 && "No"} Results for
          <span>{searchTerm}</span>
        </p>
      ) : (
        <QuestionComponent />
      )}

      {filteredQuestions.map((question) => {
        return <Question key={question._id} question={question} />;
      })}
    </div>
  );
};

export default MainHome;
