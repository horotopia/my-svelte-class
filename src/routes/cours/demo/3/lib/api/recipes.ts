const API_BASE_URL = 'https://dummyjson.com/recipes';

export async function fetchRecipes() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return [];
  }
}