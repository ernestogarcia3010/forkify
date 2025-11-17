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


async function showRecipe() {
  try {
   

    renderSpinner(recipeContainer);
    // 1. Hacer fetch de la receta
    const resp = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );

    // 2. Convertir a JSON
    const data = await resp.json();

    // 3. Obtener la receta real
    const recipe = data.data.recipe;

    // 👉 18. Eliminar el mensaje inicial
    recipeContainer.innerHTML = '';

    // 👉 20.d Eliminar ingredientes anteriores (si hubiera)
    document.querySelectorAll('.recipe__ingredient').forEach(el => el.remove());

    // 👉 20. Generar lista de ingredientes con map + join
    const ingredientsHTML = recipe.ingredients
      .map(ing => {
        return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity || ''}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit || ''}</span>
              ${ing.description}
            </div>
          </li>
        `;
      })
      .join(''); // ← importante

    // 👉 19. Crear el markup del template
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.cooking_time}</span>
          <span class="recipe__info-text">minutes</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text">servings</span>
        </div>

        <button class="btn--round">
          <svg>
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${ingredientsHTML}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${recipe.source_url}" target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;


    // 👉 19. Insertar el HTML con insertAdjacentHTML
    recipeContainer.insertAdjacentHTML('afterbegin', markup);

  } catch (err) {
    alert('Error: ' + err);
    console.error(err);
  }
}


showRecipe();
