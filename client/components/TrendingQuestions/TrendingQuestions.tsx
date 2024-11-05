"use client";

import { QuestionType } from "@/types.global";
import styles from "./trendingQuestions.module.scss";
interface QuestionProp {
  questions?: QuestionType[];
}

const TrendingQuestions = ({ questions }: QuestionProp) => {
  return (
    <div className={styles.trending_questions}>
      <h1>Trending Questions</h1>

      {questions?.map((question) => {
        return (
          <div key={question._id} className={styles.t_question}>
            <h3>{question.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default TrendingQuestions;
