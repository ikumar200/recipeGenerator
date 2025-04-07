// export const generateRecipe = async (userInput) => {
//     try {
//         const response = await fetch("http://localhost:3000/generate-recipe", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ prompt: userInput }),
//         });

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching recipe:", error);
//         return { error: "Failed to fetch recipe" };
//     }
// };

// ***************************************************

export const generateRecipe = async (ingredientsArray) => {
    try {
        const response = await fetch("http://localhost:3000/generate-recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients: ingredientsArray }),
        });

        const data = await response.json();

        // Hugging Face response format: array of objects with 'generated_text'
        if (data.recipe && Array.isArray(data.recipe) && data.recipe[0]?.generated_text) {
            return { recipe: data.recipe[0].generated_text };
        }

        // If Hugging Face returns plain text or error format
        return { recipe: typeof data.recipe === "string" ? data.recipe : "Unexpected response format" };

    } catch (error) {
        console.error("Error generating recipe:", error);
        return { recipe: "Failed to fetch recipe." };
    }
};
