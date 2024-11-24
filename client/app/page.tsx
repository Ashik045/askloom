import MainHome from "@/components/MainHome/MainHome";
import TagsServer from "@/components/Tags/TagsServerProps";
import TQserver from "@/components/TrendingQuestions/TQserverProps";
import {
  getAllQuestions,
  getAllTags,
  getTrendingQuestions,
} from "@/lib/questions";
import TagLoading from "@/loader/TagLoading";
import TrendingQLoading from "@/loader/TredingQLoading";
import styles from "@/styles/mhome.module.scss";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const questionss = await getAllQuestions();
  const trendingQuestionPromise = getTrendingQuestions();
  const tagPromise = getAllTags();

  console.log("server url", process.env.NEXT_PUBLIC_SERVER_URL);

  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <main className={styles.main_home_page}>
        <div className={styles.question_tags}>
          <Suspense fallback={<TagLoading />}>
            <TagsServer promise={tagPromise} />
          </Suspense>
        </div>

        <MainHome questions={questionss} />

        <div className={styles.trending_questionss}>
          <Suspense fallback={<TrendingQLoading />}>
            <TQserver promise={trendingQuestionPromise} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
