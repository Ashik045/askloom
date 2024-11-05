import MainHome from "@/components/MainHome/MainHome";
import Tags from "@/components/Tags/Tags";
import TrendingQuestions from "@/components/TrendingQuestions/TrendingQuestions";
import { getAllQuestions, getAllTags } from "@/lib/questions";
import styles from "@/styles/mhome.module.scss";

export default async function Home() {
  const questionss = await getAllQuestions();
  const tags = await getAllTags();

  // how do i get here my tag value. so that i can filter question by tag

  console.log(process.env.NEXT_PUBLIC_SERVER_URL);

  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <main className={styles.main_home_page}>
        <div className={styles.question_tags}>
          <Tags tags={tags} />
        </div>

        <MainHome questions={questionss} />

        <div className={styles.trending_questionss}>
          <TrendingQuestions questions={questionss} />
        </div>
      </main>
    </div>
  );
}
