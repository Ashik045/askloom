/* eslint-disable @typescript-eslint/no-explicit-any */

import QuestionDetails from "@/components/QuestionDetails/QuestionDetails";
import { getQuestionById } from "@/lib/questions";
import styles from "@/styles/questiondetails.module.scss";

interface Params {
  params: {
    id: string;
  };
}

export default async function QuestionPage({ params }: Params) {
  const { id } = params;
  const question = await getQuestionById(id);

  // console.log(question);

  if (!question) {
    // Return some fallback or error component if the question is not found
    return <div>Question not found</div>;
  }

  return (
    <div className={styles.questiondetails_page}>
      <QuestionDetails question={question} />

      <h1>Trending Questions</h1>
    </div>
  );
}
