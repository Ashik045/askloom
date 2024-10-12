import styles from "@/app/components/MainHome/mainhome.module.scss";
import { QuestionType } from "@/types.global";
import Question from "../Question/Question";
import QuestionComponent from "../QuestionComponent/QuestionComponent";

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
