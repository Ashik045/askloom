import Comments from "@/components/Comments";
import getAllPosts from "@/lib/getAllPosts";
import getPost from "@/lib/getPost";
import getPostComments from "@/lib/getPostComments";
import { Suspense } from "react";

// dynamically change the metadata
export async function generateMetadata({ params }) {
  const { id } = params;

  const post = await getPost(id);

  return {
    title: post.title,
    description: post.body,
  };
}

export default async function postPage({ params }) {
  const { id } = params;

  const postPromise = getPost(id);
  const commentPromise = getPostComments(id);

  // send this parallely
  // const [post, comments] = await Promise.all([postPromise, commentPromise])
  // console.log(comments)

  // add suspense boundary
  const post = await postPromise;

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>{post.title}</h3>

      {/* add suspense boundary for comments so it can render parallely */}
      <Suspense fallback="<h1>Loading Comments..</h1>">
        <Comments promise={commentPromise} />
      </Suspense>
    </div>
  );
}

// if the data is almost static and won't change paralally like a social site. this function will prevent the posts fetching data from the eatch click. it will generate all data on the build time.
export async function generateStaticParams() {
  const posts = await getAllPosts();

  // returl an array of objects
  // [
  //   {id: "1"},
  //   {id: "2"},
  //   {id: "3"},
  // ]

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}
