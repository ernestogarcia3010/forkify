import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { RES_PER_PAGE } from './config.js';

// 1. Objeto state
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
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
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {

    state.search.query = query;
    // 1. Llamar a la API usando helpers.getJSON
    const data = await getJSON(`${API_URL}?search=${query}`);

    // 2. Crear la matriz con los resultados formateados
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

     //console.log(state.search.results);

  } catch (err) {
    console.log(`${err}`);  // Mostrar error en consola como lo pide la práctica
    throw err;              // Volver a lanzar el error para el controller
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

//loadSearchResults('pizza');