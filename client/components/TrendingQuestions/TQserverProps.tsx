import { QuestionType } from "@/types.global";
import TrendingQuestions from "./TrendingQuestions";

type TQserverProps = {
  promise: Promise<QuestionType[]>;
};

export default async function TQserver({ promise }: TQserverProps) {
  const questions = await promise;
  return <TrendingQuestions questions={questions} />;
}
