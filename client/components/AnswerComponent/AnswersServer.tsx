// components/AnswersServer.tsx
import QuestionDetails from "@/components/QuestionDetails/QuestionDetails";
import { getCommentsByQid } from "@/lib/comments";
import { QuestionType } from "@/types.global";

interface AnswersServerProps {
  question: QuestionType;
  questionId: string;
}

export default async function AnswersServer({
  question,
  questionId,
}: AnswersServerProps) {
  const commentsPromise = getCommentsByQid(questionId);

  return (
    <QuestionDetails question={question} commentsPromise={commentsPromise} />
  );
}
