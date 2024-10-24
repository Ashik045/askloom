/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Context } from "@/Context/Context";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import styles from "./questionComponent.module.scss";

const QuestionComponent = () => {
  const [postPopup, setPostPopup] = useState(false);
  const router = useRouter();

  const { user } = useContext(Context);

  const handlePopUp = () => {
    setPostPopup(true);
  };

  const handleUserLogin = () => {
    if (!user) router.push("/login");

    router.push("/createquestion");
  };

  return (
    <div className={styles.post_comp} onClick={handleUserLogin}>
      <input
        type="text"
        placeholder="Type your question here"
        onClick={handlePopUp}
      />

      {/* `{postPopup && <PostPopup setPostPopup={setPostPopup} />}` is a conditional rendering
      statement in JSX.  */}
      {/* {postPopup && <PostPopup setPostPopup={setPostPopup} />} */}
    </div>
  );
};

export default QuestionComponent;
