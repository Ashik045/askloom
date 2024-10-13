import MainHome from "@/components/MainHome/MainHome";
import { getAllQuestions } from "@/lib/questions";
import styles from "@/styles/mhome.module.scss";

export default async function Question() {
  const questionss = await getAllQuestions();

  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <main
        className={styles.main_home_page}
        style={{ backgroundColor: "#f6fcfd" }}
      >
        <MainHome questions={questionss} />
      </main>
    </div>
  );
}
