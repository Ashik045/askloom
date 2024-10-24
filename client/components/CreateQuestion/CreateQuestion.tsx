"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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

  const onSubmit = (data: any) => {
    data.tags = tags;
    console.log("Form Data:", data);
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
            />
          ))}
        </div>
        {errors.tags?.message && <p>{String(errors.tags.message)}</p>}

        {/* Submit Button */}
        <button type="submit">Create Question</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
