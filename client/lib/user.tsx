const getUserByuserId = async (userId: string) => {
  try {
    const result = await fetch(`http://localhost:4000/api/auth/user/${userId}`);

    if (!result.ok) {
      throw new Error("Failed to fetch the requested question");
    }

    const data = await result.json();

    // Return the question directly (assuming the structure matches)
    return data.message;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("There was an error fetching user!");
  }
};

export { getUserByuserId };
