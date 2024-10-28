/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from "@/Context/Context";
import noImage from "@/public/images/no-photo.png";
import { UserType } from "@/types.global";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import styles from "./editpopup.module.scss";

interface UserT {
  user: UserType;
  setEditPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

type Inputs = {
  email: string;
  displayName: string;
  about: string;
  photoUrl: string;
};

const EditPopup = ({ user, setEditPopUp }: UserT) => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const router = useRouter();

  const { dispatch } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    trigger,
  } = useForm<Inputs>({
    defaultValues: {
      email: user.email || "",
      displayName: user.displayName || "",
      about: user.about || "",
    },
  });

  // Watch form fields to detect changes
  const watchedFields = watch();

  // UseEffect to detect if any field has changed
  useEffect(() => {
    if (
      watchedFields.email !== user.email ||
      watchedFields.displayName !== user.displayName ||
      watchedFields.about !== user.about ||
      profilePic
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [watchedFields, profilePic, user]);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePic(e.target.files[0]);
      setHasChanges(true);
    }
  };

  const onSubmit = async (data: Inputs) => {
    if (!hasChanges) {
      setErrorMessages(["No changes detected."]);
      return;
    }

    setLoading(true);
    dispatch({ type: "USER_UPDATE_START" });

    try {
      let profilePictureUrl = user.photoUrl;

      if (profilePic) {
        const formData = new FormData();
        formData.append("file", profilePic);
        formData.append("upload_preset", "uploads");

        const { data: uploadData } = await axios.post(
          "https://api.cloudinary.com/v1_1/dqctmbhde/image/upload",
          formData
        );
        profilePictureUrl = uploadData.url;
      }

      const updatedUser = {
        ...data,
        email: data.email.toLowerCase(),
        photoUrl: profilePictureUrl,
      };

      const response = await axios.put(
        `http://localhost:4000/api/auth/user/update${user._id}`,
        updatedUser
      );

      setLoading(false);

      if (response.data.user) {
        dispatch({ type: "USER_UPDATE_SUCCESS", payload: response.data.user });
        router.push(`/profile/${user._id}`);
        reset();
        setEditPopUp(false);
      }
    } catch (error: any) {
      dispatch({
        type: "USER_UPDATE_FAILURE",
        payload: error.response.data.error,
      });
      setErrorMessages(["There was an error updating the user."]);
      setLoading(false);
    }
  };
  const handleClose = () => {
    setEditPopUp(false);
  };

  return (
    <div className={styles.edit_popup}>
      <div className={styles.form_div}>
        <span onClick={handleClose} className={styles.close_icon}>
          <FaTimes />
        </span>

        <h1>Update User</h1>

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
            className={styles.exact_form_inp}
            style={{ textTransform: "lowercase" }}
          />
          <span className={styles.form_err}>{errors.email?.message}</span>

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
            className={styles.exact_form_inp}
          />
          <span className={styles.form_err}>{errors.displayName?.message}</span>

          <label>About*</label>
          <textarea
            {...register("about", {
              required: "About field is required!",
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
            className={styles.textarea}
            rows={3}
            cols={70}
            required
          />
          <span className={styles.form_err}>{errors.about?.message}</span>

          <div className={styles.form_inp_profile_pic}>
            <Image
              src={
                profilePic
                  ? URL.createObjectURL(profilePic)
                  : user.photoUrl || noImage
              }
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
            />
          </div>

          {errorMessages.map((errorMessage, index) => (
            <p key={index} className={styles.f_errors}>
              {errorMessage}
            </p>
          ))}

          <input
            type="submit"
            value={loading ? "Loading.." : "Update"}
            className={styles.submit_btn}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          />
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
