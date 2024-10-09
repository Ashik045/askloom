import getAllPosts from "@/lib/getAllPosts";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
}

// server component
export default async function Posts() {
  // call the fetch function(no use of useEffect here)
  const posts: Post[] = await getAllPosts();

  // console.log(posts);

  return (
    <div style={{ marginTop: "30px" }}>
      <h1>All Posts</h1>

      <div style={{ marginTop: "10px" }}>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}> {post.title}</Link>
            </li>
          );
        })}
      </div>
    </div>
  );
}
