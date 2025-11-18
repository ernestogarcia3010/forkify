import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// 1. Objeto state
export const state = {
  recipe: {},
};

// 2. Función loadRecipe
export const loadRecipe = async function (id) {
  try {
    // a) Obtener la receta desde la API
    //const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      source_url: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);

  } catch (err) {
    alert(err);
    throw err;
  }
};
