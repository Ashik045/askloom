import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ marginTop: "100px" }}>
      <h1>Question Not Found</h1>
      <p>The Question you are looking for does not exist.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
