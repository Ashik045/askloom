"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from "@/Context/Context";
import { QuestionType } from "@/types.global";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import ReactQuill from "react-quill"; // Rich text editor
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Styles for the editor
import styles from "./createquestion.module.scss";
interface OptionalQuestionProp {
  initialData?: QuestionType;
}

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateQuestion = ({ initialData }: OptionalQuestionProp) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      question: initialData?.question || "",
    },
  });
  const [tags, setTags] = useState(
    initialData?.tags
      ? [...initialData.tags, "", "", ""].slice(0, 3)
      : ["", "", ""]
  );
  const [loading, setLoading] = useState(false); // State for
  const [inpChanged, setInpChanged] = useState(false); // State for
  const router = useRouter();
  const [error, setError] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const { user } = useContext(Context);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
  // Handle changes in title, question, and tags inputs
  const handleInputChange = () => setInpChanged(true);

  const onSubmit = async (data: any) => {
    if (
      data.title === initialData?.title &&
      data.question === initialData?.question &&
      JSON.stringify(tags) === JSON.stringify(initialData?.tags)
    ) {
      console.log("No changes detected, skipping submission.");
      return;
    }

    if (!inpChanged) {
      setError("No changes detected!");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const enrichedData = {
        ...data,
        tags: tags.filter((tag) => tag.trim() !== ""),
        userid: user?._id,
        user: user?.displayName,
        userTitle: user?.title,
        userPhoto: user?.photoUrl,
      };

      const token =
        typeof window !== "undefined" && localStorage.getItem("jwttoken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // console.log(initialData);

      try {
        const url = initialData
          ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/edit/${initialData._id}`
          : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/create`;

        const method = initialData ? axios.put : axios.post;
        const response = await method(url, enrichedData, config);

        if (response.data.message) {
          // console.log(response.data.message);

          if (initialData) {
            router.push(`/questions/${initialData._id}`);
          } else {
            router.push("/");
          }
        }

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setErrorMessages(error.response?.data?.error);
        console.error("Error submitting form:", error);
      }

      // console.log(enrichedData);
      setLoading(false);
    } catch (error: any) {
      setErrorMessages(error.response?.data?.error);
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  // Function to handle changes in tag inputs
  const handleTagChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTags = [...tags];
    newTags[index] = event.target.value;
    setTags(newTags);
  };

  return (
    <div className={styles.create_question}>
      <h1>{initialData ? "Edit Question" : "Ask a Question"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="create-question-form">
        <div className={styles.question_inp}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Minimum length is 5 characters!",
              },
              maxLength: {
                value: 250,
                message: "Maximum length is 250 characters!",
              },
            })}
            placeholder="Enter your question title"
            onChange={handleInputChange}
          />
          {errors.title?.message && (
            <p className={styles.question_inp_error}>
              {String(errors.title.message)}
            </p>
          )}
        </div>

        <div className={styles.question_inp}>
          <label htmlFor="question">Question:</label>
          <ReactQuill
            theme="snow"
            onChange={(content) => {
              setValue("question", content);
              handleInputChange();
            }}
            className={styles.custom_editor}
            value={watch("question")}
            modules={{
              toolbar: [
                ["bold", "italic"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ size: [] }],
              ],
            }}
            style={{
              height: "200px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              overflowY: "auto",
            }}
          />
          {errors.question?.message && <p>{String(errors.question.message)}</p>}
        </div>

        <div className={styles.tag_inputs}>
          <label>Tags:</label>
          {tags.map((tag, index) => (
            <input
              key={index}
              type="text"
              value={tag}
              placeholder={`Tag ${index + 1}`}
              onChange={(e) => {
                handleTagChange(index, e);
                handleInputChange();
              }}
              style={{ textTransform: "lowercase" }}
            />
          ))}
        </div>
        {/* {errors.tag?.message && <p>{String(errors.tags.message)}</p>} */}

        {error && <p style={{ color: "red" }}>{error}</p>}
        {errorMessages && (
          <p
            className={styles.f_errors}
            style={{
              marginBottom: "-16px",
              marginTop: "9px",
              color: "red",
              textAlign: "center",
            }}
          >
            {errorMessages}
          </p>
        )}
        <button type="submit">
          {loading
            ? "Loading.."
            : initialData
            ? "Update Question"
            : "Create Question"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
