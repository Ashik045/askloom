import Profile from "@/components/Profile/Profile";
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

  // console.log(user);

  return (
    <div className={styles.profile_page}>
      <Profile user={user} />
    </div>
  );
}
