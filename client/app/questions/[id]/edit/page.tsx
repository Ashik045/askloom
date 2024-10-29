import CreateQuestion from "@/components/CreateQuestion/CreateQuestion";
import styles from "@/styles/createquestion.module.scss";
import axios from "axios";

interface ParamProp {
  params: {
    id: string;
  };
}

export default async function page({ params }: ParamProp) {
  const response = await axios.get(
    `http://localhost:4000/api/question/${params.id}`
  );
  const questionData = response.data.message;

  return (
    <div className={styles.create_q_page}>
      <CreateQuestion initialData={questionData} />
    </div>
  );
}