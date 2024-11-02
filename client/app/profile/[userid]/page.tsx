import Profile from "@/components/Profile/Profile";
import { getQuestionsOfUser } from "@/lib/questions";
import { getUserByuserId } from "@/lib/user";
import styles from "@/styles/profilepage.module.scss";
import NotFound from "./not-found";

interface Params {
  params: {
    userid: string;
  };
}

export default async function page({ params }: Params) {
  const { userid } = params;

  const user = await getUserByuserId(userid);
  const questionss = await getQuestionsOfUser(userid);

  // If user is not found, render the NotFound component
  if (!user) {
    return <NotFound />;
  }

  // create a suspense boundary for user data and questions

  return (
    <div className={styles.profile_page}>
      <Profile userr={user} questions={questionss} />
    </div>
  );
}
