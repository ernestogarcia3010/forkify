import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import resultsView from './views/ResultsView.js';
import searchView from './views/searchView.js';
import icons from 'url:../img/icons.svg';

 const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

function renderSpinner(parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;

  // limpiar contenido previo
  parentEl.innerHTML = '';

  // insertar spinner
  parentEl.insertAdjacentHTML('afterbegin', markup);
}

// Función principal del controlador

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );

function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}


const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1. Obtener query desde la vista
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Cargar resultados desde el modelo
    await model.loadSearchResults(query);

    // 3. Imprimir resultados en consola (solo para pruebas)
    console.log(model.state.search.results);
     resultsView.render(model.state.search.results);
    
  } catch (err) {
    console.log(err);
  }
};

init();