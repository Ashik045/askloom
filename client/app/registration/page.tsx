/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Context } from "@/Context/Context";
/* eslint-disable @typescript-eslint/no-explicit-any */
import noImage from "@/public/images/no-photo.png";
import styles from "@/styles/registration.module.scss";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  title: string;
  about: string;
  photoUrl: string;
};

export default function Regpage() {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { dispatch } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, touchedFields, isValid },
    watch,
    reset,
    trigger,
    clearErrors,
  } = useForm<Inputs>();

  const password = watch("password", "");

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePic(e.target.files[0]);
    }
  };

  const onSubmit = async (data: Inputs) => {
    setLoading(true);
    const { confirmPassword, email, ...others } = data;

    dispatch({ type: "LOGIN_START" });

    try {
      let profilePicture = "";
      let newUser = {};

      // Upload profile picture and cover photo code...
      if (profilePic) {
        const formData = new FormData();
        formData.append("file", profilePic);
        formData.append("upload_preset", "uploads");

        const {
          data: { url },
        } = await axios.post(
          "https://api.cloudinary.com/v1_1/dqctmbhde/image/upload",
          formData
        );

        profilePicture = url;
      }

      newUser = {
        ...others,
        email: email.toLocaleLowerCase(),
        photoUrl: profilePicture,
      };

      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/registration",
          newUser
        );

        if (response.data.user) {
          localStorage.setItem("jwttoken", response.data.token);

          // Dispatch the success action with user data
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
          router.push("/");
          reset();
        }

        setLoading(false);
      } catch (error: any) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.error });
        setErrorMessages(error.response.data.error);

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ errors?: any }>;
          if (
            axiosError.response &&
            axiosError.response.data &&
            axiosError.response.data.errors
          ) {
            const { errors } = axiosError.response.data;
            // setErrorMessages(errors);
          }
        }

        setLoading(false);
      }
    } catch (error: any) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.error });
      setErrorMessages(error.response.data.error);
      setLoading(false);
      throw new Error("There was an error logging user!");
    }
  };

  return (
    <div className={styles.reg_page}>
      <div className={styles.reg_page_component}>
        <h1>Register</h1>
        <form className={styles.reg_form} onSubmit={handleSubmit(onSubmit)}>
          <label>Email*</label>
          <input
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            onBlur={() => {
              trigger("email");
            }}
            className={styles.exact_form_inp}
            style={{ textTransform: "lowercase" }}
          />
          {/* error message */}
          <span className={styles.form_err}>{formErrors?.email?.message}</span>

          <label>Full Name*</label>
          <input
            {...register("displayName", {
              required: "Name should be 3-40 characters!",
              minLength: {
                value: 3,
                message: "Minimum length is 3 characters!",
              },
              maxLength: {
                value: 40,
                message: "Maximum length is 40 characters!",
              },
            })}
            placeholder="Full Name"
            onBlur={() => {
              trigger("displayName");
            }}
            className={styles.exact_form_inp}
          />
          <span className={styles.form_err}>
            {formErrors?.displayName?.message}
          </span>

          <label>Title*</label>
          <input
            {...register("title", {
              required: "Title should be 3-40 characters!",
              minLength: {
                value: 3,
                message: "Minimum length is 3 characters!",
              },
              maxLength: {
                value: 40,
                message: "Maximum length is 40 characters!",
              },
            })}
            placeholder="Title"
            onBlur={() => {
              trigger("title");
            }}
            className={styles.exact_form_inp}
          />
          <span className={styles.form_err}>{formErrors?.title?.message}</span>

          <label>About*</label>
          <textarea
            {...register("about", {
              required: "About field is required!!",
              minLength: {
                value: 10,
                message: "Minimum length is 10 characters!",
              },
              maxLength: {
                value: 400,
                message: "Maximum length is 400 characters!",
              },
            })}
            placeholder="About yourself"
            onBlur={() => {
              trigger("about");
            }}
            className={styles.textarea}
            rows={3}
            cols={70}
          />
          {/* error message */}
          <span className={styles.form_err}>{formErrors?.about?.message}</span>

          <div className={styles.form_inp_profile_pic}>
            <Image
              src={profilePic ? URL.createObjectURL(profilePic) : noImage}
              alt="upload image"
              width={70}
              height={70}
              className={styles.img}
            />
            <label htmlFor="file">Profile Image: </label>

            <input
              type="file"
              name="file"
              id="file"
              onChange={handleProfilePictureChange}
              // onChange={(e) => setProfilePicture(e.target.files?.[0])}
            />
          </div>

          <label>Password*</label>
          <input
            type="password"
            {...register("password", {
              required:
                "Password should be at least 6 characters & should contain at least 1 lowercase, 1 upper case, 1 number & 1 symbol!",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~\-=`{}[\]:;<>?,.@#])[a-zA-Z\d!@#$%^&*()_+|~\-=`{}[\]:;<>?,.@#]{6,}$/,
                message:
                  "Provide at least 6 characters & should contain at least 1 lowercase, 1 upper case, 1 number & 1 symbol!",
              },
              minLength: {
                value: 6,
                message: "Minimum length is 6 characters!",
              },
            })}
            placeholder="Password"
            onBlur={() => {
              trigger("password");
            }}
            className={styles.exact_form_inp}
          />
          <span className={styles.form_err}>
            {formErrors?.password?.message}
          </span>

          <label>Confirm Password*</label>

          <input
            type="password"
            {...register("confirmPassword", {
              required: "Password doesn't matched!",
              validate: (value) =>
                value === password || "Password doesn't matched!",
            })}
            placeholder="Re-enter your password*"
            onBlur={() => {
              trigger("confirmPassword");
            }}
            className={styles.exact_form_inp}
          />
          <span className={styles.form_err}>
            {formErrors?.confirmPassword?.message}
          </span>

          {errorMessages && (
            <p className={styles.f_errors} style={{ marginBottom: "-18px" }}>
              {errorMessages}
            </p>
          )}

          <input
            type="submit"
            value={loading ? "Loading..." : "Submit"}
            className={styles.submit_btn}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
            }}
          />

          <p className={styles.reg_p}>
            <Link href={"/login"}>Already have an account? Log In now.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
