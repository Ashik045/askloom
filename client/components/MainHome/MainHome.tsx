import { QuestionType } from "@/types.global";
import Question from "../Question/Question";
import QuestionComponent from "../QuestionComponent/QuestionComponent";
import styles from "./mainhome.module.scss";

interface QuestionProp {
  questions: QuestionType[];
}

const MainHome = ({ questions }: QuestionProp) => {
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
