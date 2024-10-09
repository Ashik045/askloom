import Link from "next/link";

const Blogs = () => {
  // static data for all blog
  const blogData = [
    {
      id: 1,
      title: "Blog 1",
      desc: "Blog 1 description.",
    },
    {
      id: 2,
      title: "Blog 2",
      desc: "Blog 2 description.",
    },
    {
      id: 3,
      title: "Blog 3",
      desc: "Blog 3 description.",
    },
  ];

  return (
    <main>
      <div style={{ marginTop: "40px" }}>
        <ul style={{ listStyleType: "none" }}>
          {blogData.map((blog) => {
            return (
              <Link key={blog.id} href={`/blogs/${blog.id}`}>
                {" "}
                <li style={{ marginBottom: "10px" }}>{blog.title}</li>{" "}
              </Link>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Blogs;
