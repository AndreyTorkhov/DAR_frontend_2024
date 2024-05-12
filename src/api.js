const URL = `https://dummyjson.com/recipes`;

async function getAllRecipes() {
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getFilteredRecipes(recipeName) {
  try {
    const response = await fetch(URL + "/search?q=" + recipeName);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getRecipesByTags(tag) {
  try {
    const response = await fetch(URL + "/tag/" + tag);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getRecipesByMealType(mealType) {
  try {
    const response = await fetch(URL + "/meal-type/" + mealType);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getSingleResipe(id) {
  try {
    const response = await fetch(URL + "/" + id);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export {
  getAllRecipes,
  getFilteredRecipes,
  getRecipesByTags,
  getRecipesByMealType,
  getSingleResipe,
};
