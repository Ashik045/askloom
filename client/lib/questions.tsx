/* eslint-disable @typescript-eslint/no-explicit-any */
const getAllQuestions = async () => {
  try {
    const result = await fetch(`${process.env.SERVER_URL}/api/questions/all`, {
      cache: "no-store",
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
    const result = await fetch(`${process.env.SERVER_URL}/api/question/${id}`, {
      cache: "no-store",
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

const getQuestionsOfUser = async (id: string | number) => {
  try {
    // Fix the URL format, remove the colon and directly insert `id`
    const result = await fetch(
      `${process.env.SERVER_URL}/api/questions/all/${id}`,
      {
        cache: "no-store",
      }
    );

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

const getAllTags = async () => {
  try {
    const result = await fetch(`${process.env.SERVER_URL}/api/questions/tags`);

    // Check if the response was successful
    if (!result.ok) {
      throw new Error("Failed to fetch question tags");
    }

    // Await the JSON parsing
    const data = await result.json();

    // Return the message array from the response
    return data.message; // Since your data is inside the 'message' array
  } catch (error) {
    console.error("Error fetching question tags:", error);
    throw new Error("There was an error fetching question tags!");
  }
};

export { getAllQuestions, getAllTags, getQuestionById, getQuestionsOfUser };
