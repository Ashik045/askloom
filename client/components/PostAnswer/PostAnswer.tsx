import { Context } from "@/Context/Context";
import noPhoto from "@/public/images/no-photo.png";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./postanswer.module.scss";

type Inputs = {
  answer: string;
};

const PostAnswer = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, touchedFields, isValid },
    watch,
    reset,
    trigger,
    clearErrors,
  } = useForm<Inputs>();

  const { user } = useContext(Context);

  const onSubmit = async (data: Inputs) => {
    console.log(data);
  };

  return (
    <div className={styles.answer_comp}>
      <div className={styles.write_answer}>
        <Link href={`/profile/${user?._id}`}>
          <Image
            className={styles.profilePic}
            src={user?.photoUrl ? user?.photoUrl : noPhoto}
            height={34}
            width={34}
            alt="askloom profile"
          />
        </Link>

        <form className={styles.reg_form} onSubmit={handleSubmit(onSubmit)}>
          <label>Email*</label>
          <input
            {...register("answer", {
              required: "Answer should be 3-300 characters!",
              minLength: {
                value: 3,
                message: "Minimum length is 3 characters!",
              },
              maxLength: {
                value: 300,
                message: "Maximum length is 300 characters!",
              },
            })}
            placeholder="Add you answer.."
            onBlur={() => {
              trigger("answer");
            }}
            className={styles.exact_form_inp}
          />

          <input
            type="submit"
            value={loading ? "Loading..." : "Add Answer"}
            className={styles.submit_btn}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
            }}
          />
        </form>
      </div>
      <span className={styles.form_err}>{formErrors?.answer?.message}</span>
    </div>
  );
};

export default PostAnswer;
