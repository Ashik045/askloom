"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from "@/Context/Context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill"; // Rich text editor
import "react-quill/dist/quill.snow.css"; // Styles for the editor
import styles from "./createquestion.module.scss";

const CreateQuestion = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState(["", "", ""]); // State for storing three tags
  const [loading, setLoading] = useState(false); // State for
  const router = useRouter();

  const { user, dispatch } = useContext(Context);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const enrichedData = {
        ...data,
        tags: tags.filter((tag) => tag.trim() !== ""), // Filter out empty tags
        userid: user?._id,
        user: user?.displayName,
        userTitle: user?.about,
      };

      try {
        const response = await axios.post(
          "http://localhost:4000/api/question/create",
          enrichedData
        );
        setLoading(false);

        if (response.data.message) {
          console.log(response.data.message);

          router.push("/");
        }

        setLoading(false);
      } catch (error: any) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.error });
      }

      console.log(enrichedData);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  // Function to handle changes in tag inputs
  const handleTagChange = (index: any, event: any) => {
    const newTags = [...tags];
    newTags[index] = event.target.value; // Update the specific tag
    setTags(newTags); // Set the updated tags array
  };

  return (
    <div className={styles.create_question}>
      <h1>Ask a question</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="create-question-form">
        {/* Title Field */}
        <div className={styles.question_inp}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title?.message && <p>{String(errors.title.message)}</p>}
        </div>

        {/* Question Field (Custom Styled ReactQuill) */}
        <div className={styles.question_inp}>
          <label htmlFor="question">Question:</label>
          <ReactQuill
            theme="snow"
            onChange={(content) => setValue("question", content)}
            className={styles.custom_editor}
            modules={{
              toolbar: [
                ["bold", "italic"], // Toggle bold/italic text
                [{ list: "ordered" }, { list: "bullet" }], // Ordered/bullet lists
                [{ size: [] }], // Font size dropdown
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

        {/* Tag Fields */}
        <div className={styles.tag_inputs}>
          <label>Tags:</label>
          {tags.map((tag, index) => (
            <input
              key={index}
              type="text"
              value={tag}
              placeholder={`Tag ${index + 1}`}
              onChange={(e) => handleTagChange(index, e)}
              style={{ textTransform: "lowercase" }}
            />
          ))}
        </div>
        {errors.tags?.message && <p>{String(errors.tags.message)}</p>}

        {/* Submit Button */}
        <button type="submit">
          {loading ? "Loading.." : "Create Question"}{" "}
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
