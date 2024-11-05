"use client";
import { useState } from "react";
import styles from "./tags.module.scss";

type TagType = {
  tags: string[];
};

const Tags = ({ tags }: TagType) => {
  const [tagVal, setTagVal] = useState("");
  console.log(tagVal);

  const handleTag = (val: string) => {
    const tag = val.split("(")[0];

    setTagVal(tag);
  };

  return (
    <div className={styles.question_tags}>
      {tags.map((tag) => {
        return (
          <div
            key={tag}
            className={styles.question_tag}
            onClick={() => handleTag(tag)}
          >
            <span className={styles.tag}>{tag}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Tags;
