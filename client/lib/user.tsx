const getUserByuserId = async (userId: string) => {
  try {
    const result = await fetch(
      `${process.env.SERVER_URL}/api/auth/user/${userId}`,
      {
        cache: "no-store",
      }
    );

    if (!result.ok) {
      throw new Error("Failed to fetch the requested user!");
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
