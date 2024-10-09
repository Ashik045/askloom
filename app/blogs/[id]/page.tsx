import { notFound } from "next/navigation";

interface BlogPageProps {
  params: {
    id: string;
  };
}

const BlogPage = ({ params }: BlogPageProps) => {
  const { id } = params;

  // fetch the data based on id

  //   not fould url
  if (id === "6") {
    return notFound();
  }

  return (
    <div>
      <h3>{id}</h3>
    </div>
  );
};

export default BlogPage;
