import { QuestionType } from "@/types.global";
import Link from "next/link";
import styles from "./question.module.scss";

interface QuestionProps {
  question: QuestionType;
}

const Question = ({ question }: QuestionProps) => {
  return (
    <div className={styles.single_question}>
      <h2>
        <Link href={question._id.toString()}> {question.title}</Link>
      </h2>
      <p>
        <Link href={question.user}>asked by {question.user}</Link>
      </p>
      <p>{question.question}</p>
      <p>liked by {question.reacts.length} peoples</p>
    </div>
  );
};

export default Question;
