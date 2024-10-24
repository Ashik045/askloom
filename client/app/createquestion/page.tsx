import CreateQuestion from "@/components/CreateQuestion/CreateQuestion";
import styles from "@/styles/createquestion.module.scss";

export default function page() {
  return (
    <div className={styles.create_q_page}>
      <CreateQuestion />
    </div>
  );
}
