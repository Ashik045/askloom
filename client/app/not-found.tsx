import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ marginTop: "150px" }}>
      <h1>Not Found page</h1>
      <p>The requested page was Not Found</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
