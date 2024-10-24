import Profile from "@/components/Profile/Profile";
import { getAllQuestions } from "@/lib/questions";
import { getUserByuserId } from "@/lib/user";
import styles from "@/styles/profilepage.module.scss";

interface Params {
  params: {
    userid: string;
  };
}

export default async function page({ params }: Params) {
  const { userid } = params;
  const user = await getUserByuserId(userid);
  const questionss = await getAllQuestions();

  // create a suspense boundary

  return (
    <div className={styles.profile_page}>
      <Profile user={user} questions={questionss} />
    </div>
  );
}
