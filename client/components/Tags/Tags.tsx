"use client";
import { useTag } from "@/TagContext/TagContext";
import styles from "./tags.module.scss";

type TagType = {
  tags: string[];
};

const Tags = ({ tags }: TagType) => {
  const { setTagVal } = useTag();

  const handleTag = (val: string) => {
    const tag = val.split("(")[0];

    setTagVal(tag);
  };

  return (
    <div className={styles.question_tags}>
      <h1>Tags</h1>

      <div className={styles.question_tag}>
        {tags?.map((tag) => {
          return (
            <span
              className={styles.tag}
              key={tag}
              onClick={() => handleTag(tag)}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;
