import { QuestionType } from "@/types.global";
import styles from "./trendingQuestions.module.scss";
interface QuestionProp {
  questions?: QuestionType[];
}

const TrendingQuestions = ({ questions }: QuestionProp) => {
  // console.log(questions);

  return (
    <div className={styles.trending_questions}>
      <h1>Trending Questions</h1>
    </div>
  );
};

export default TrendingQuestions;
