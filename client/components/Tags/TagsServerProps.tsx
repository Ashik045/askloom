import Tags from "./Tags";

type TagsServerProps = {
  promise: Promise<string[]>;
};

export default async function TagsServer({ promise }: TagsServerProps) {
  const tags = await promise; // Await the promise to get tag data
  return <Tags tags={tags} />;
}
