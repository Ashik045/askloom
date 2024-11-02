import MainHome from "@/components/MainHome/MainHome";
import { getAllQuestions } from "@/lib/questions";
import styles from "@/styles/mhome.module.scss";

export default async function Home() {
  const questionss = await getAllQuestions();

  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <main className={styles.main_home_page}>
        <h1>tags</h1>
        <MainHome questions={questionss} />
        <h1>Trending Questions</h1>
      </main>
    </div>
  );
}
