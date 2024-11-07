"use client";

import { QuestionType } from "@/types.global";
import Link from "next/link";
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
            <h3>
              <Link href={`/questions/${question._id}`}> {question.title}</Link>
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default TrendingQuestions;
