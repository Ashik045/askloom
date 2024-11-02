/* eslint-disable @typescript-eslint/no-explicit-any */

import QuestionDetails from "@/components/QuestionDetails/QuestionDetails";
import { getCommentsByQid } from "@/lib/comments";
import { getQuestionById } from "@/lib/questions";
import styles from "@/styles/questiondetails.module.scss";
import NotFound from "./not-found";

interface Params {
  params: {
    id: string;
  };
}

export default async function QuestionPage({ params }: Params) {
  const { id } = params;
  const question = await getQuestionById(id);
  const comments = await getCommentsByQid(id);

  // console.log(question);

  if (!question) {
    // Return some fallback or error component if the question is not found
    return <NotFound />;
  }

  return (
    <div className={styles.questiondetails_page}>
      <QuestionDetails question={question} answers={comments} />

      <h1>Trending Questions</h1>
    </div>
  );
}
