/* eslint-disable @typescript-eslint/no-explicit-any */
const getAllQuestions = async () => {
  try {
    const result = await fetch(`http://localhost:4000/api/questions/all`, {
      next: {
        revalidate: 1, // This revalidates the cache every 10 seconds
      },
    });

    // Check if the response was successful
    if (!result.ok) {
      throw new Error("Failed to fetch questions");
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

const getQuestionById = async (id: string | number) => {
  try {
    // Fix the URL format, remove the colon and directly insert `id`
    const result = await fetch(`http://localhost:4000/api/question/${id}`, {
      next: {
        revalidate: 1, // This revalidates the cache every 10 seconds
      },
    });

    if (!result.ok) {
      throw new Error("Failed to fetch the requested question");
    }

    const data = await result.json();

    // Return the question directly (assuming the structure matches)
    return data.message; // or `data.question` based on your actual API response structure
  } catch (error) {
    console.error("Error fetching the question:", error);
    throw new Error("There was an error fetching the question!");
  }
};

export { getAllQuestions, getQuestionById };
