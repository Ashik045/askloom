import styles from "@/styles/mhome.module.scss";
import MainHome from "./components/MainHome/MainHome";

export default function Home() {
  // const Questions = getAllQuestions();

  const questions = [
    {
      _id: 1,
      title: "First Question",
      question:
        "lorem ipsum dolor sit amet dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol. lorem ipsum dolor sit amet dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol. lorem ipsum dolor sit amet dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol.",
      user: "Devv",
      userTitle: "Frontend Developer.",
      tags: ["js, ts, css"],
      reacts: ["2423", "2342", "2343", "2344", "2345"],
      comments: [
        {
          commentid: "123",
          userid: "897234",
          comment: "This is a comment",
        },
        {
          commentid: "124",
          userid: "897234",
          comment: "This is a comment",
        },
      ],
    },
    {
      _id: 2,
      title: "Second Question",
      question:
        "lorem ipsum dolor sit amet dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol.",
      user: "Devv",
      userTitle: "Frontend Developer.",
      tags: ["js, ts, css"],
      reacts: ["2423", "2342", "2343", "2344", "2345"],
      comments: [
        {
          commentid: "123",
          userid: "897234",
          comment: "This is a comment",
        },
        {
          commentid: "124",
          userid: "897234",
          comment: "This is a comment",
        },
      ],
    },
    {
      _id: 3,
      title: "Thired Question",
      question:
        "lorem ipsum dolor sit amet dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol.  lorem ipsum dolor sit amet dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol. lorem ipsum dolor sit amet dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol.",
      user: "Devv",
      userTitle: "Frontend Developer.",
      tags: ["js, ts, css"],
      reacts: ["2423", "2342", "2343", "2344", "2345"],
      comments: [
        {
          commentid: "123",
          userid: "897234",
          comment: "This is a comment",
        },
        {
          commentid: "124",
          userid: "897234",
          comment: "This is a comment",
        },
      ],
    },
    {
      _id: 4,
      title: "Fourth Question",
      question:
        "lorem ipsum dolor sit amet dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol.",
      user: "Devv",
      userTitle: "Frontend Developer.",
      tags: ["js, ts, css"],
      reacts: ["2423", "2342", "2343", "2344", "2345"],
      comments: [
        {
          commentid: "123",
          userid: "897234",
          comment: "This is a comment",
        },
        {
          commentid: "124",
          userid: "897234",
          comment: "This is a comment",
        },
      ],
    },
    {
      _id: 5,
      title: "Fifth Question",
      question:
        "lorem ipsum dolor sit amet dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol.",
      user: "Devv",
      userTitle: "Frontend Developer.",
      tags: ["js, ts, css"],
      reacts: ["2423", "2342", "2343", "2344", "2345"],
      comments: [
        {
          commentid: "123",
          userid: "897234",
          comment: "This is a comment",
        },
        {
          commentid: "124",
          userid: "897234",
          comment: "This is a comment",
        },
      ],
    },
  ];

  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <main
        className={styles.main_home_page}
        style={{ backgroundColor: "#f6fcfd" }}
      >
        <h1>tags</h1>
        <MainHome questions={questions} />
        <h1>Trending Questions</h1>
      </main>
    </div>
  );
}
