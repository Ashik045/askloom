/* eslint-disable @typescript-eslint/no-explicit-any */

import AnswersServer from "@/components/AnswerComponent/AnswersServer";
import TQserver from "@/components/TrendingQuestions/TQserverProps";
import { getQuestionById, getTrendingQuestions } from "@/lib/questions";
import TrendingQLoading from "@/loader/TredingQLoading";
import styles from "@/styles/questiondetails.module.scss";
import { Suspense } from "react";
import NotFound from "./not-found";

interface Params {
  params: {
    id: string;
  };
}

export default async function QuestionPage({ params }: Params) {
  const { id } = params;
  const question = await getQuestionById(id);
  // const comments = await getCommentsByQid(id);
  const trendingQuestionPromise = getTrendingQuestions();

  if (!question) {
    // Return some fallback or error component if the question is not found
    return <NotFound />;
  }

  return (
    <div className={styles.questiondetails_page}>
      <AnswersServer question={question} questionId={id} />

      <div className={styles.trending_questionss}>
        <Suspense fallback={<TrendingQLoading />}>
          <TQserver promise={trendingQuestionPromise} />
        </Suspense>
      </div>
    </div>
  );
}
