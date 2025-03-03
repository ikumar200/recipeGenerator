export const generateRecipe = async (userInput) => {
    try {
        const response = await fetch("http://localhost:5000/generate-recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: userInput }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching recipe:", error);
        return { error: "Failed to fetch recipe" };
    }
};
