"use client";

import { Context } from "@/Context/Context";
import { QuestionType } from "@/types.global";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Question from "../Question/Question";
import QuestionComponent from "../QuestionComponent/QuestionComponent";
import styles from "./mainhome.module.scss";

interface QuestionProp {
  questions: QuestionType[];
}

const MainHome = ({ questions }: QuestionProp) => {
  const router = useRouter();
  const { dispatch } = useContext(Context);

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
      <QuestionComponent />

      {questions.map((question) => {
        return <Question key={question._id} question={question} />;
      })}
    </div>
  );
};

export default MainHome;
