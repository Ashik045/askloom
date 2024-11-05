/* eslint-disable @typescript-eslint/no-explicit-any */
const getCommentsByQid = async (qid: any) => {
  try {
    const result = await fetch(
      `${process.env.SERVER_URL}/api/comments/${qid}`,
      {
        cache: "no-store",
      }
    );

    // Check if the response was successful
    if (!result.ok) {
      throw new Error("Failed to fetch comments");
    }

    // Await the JSON parsing
    const data = await result.json();

    // Return the message array from the response
    return data.message; // Since your data is inside the 'message' array
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("There was an error fetching questions!");
  }
};

export { getCommentsByQid };
