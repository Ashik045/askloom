import MainHome from "@/components/MainHome/MainHome";
import TrendingQuestions from "@/components/TrendingQuestions/TrendingQuestions";
import { getAllQuestions } from "@/lib/questions";
import styles from "@/styles/mhome.module.scss";

export default async function Home() {
  const questionss = await getAllQuestions();

  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <main className={styles.main_home_page}>
        <div className={styles.question_tags}>
          <h1>tags</h1>
        </div>

        <MainHome questions={questionss} />

        <div className={styles.trending_questionss}>
          <TrendingQuestions questions={questionss} />
        </div>
      </main>
    </div>
  );
}
