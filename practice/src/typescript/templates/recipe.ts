import { Recipe } from "../helpers/type-recipe";

/**
 * The recipeRowTemplateRecipe function receives an array of data containing recipe information and returns an HTML string representing the rows of the recipe table.
 * @param {Recipe[]} data - Array containing recipe information.
 * @returns {string} - HTML string representing the rows of the recipes table.
 */
const recipeRowTemplateRecipe = (data: Recipe[]): string => {
  return data.length
    ? data
        .map((item) => {
          return `
    <tr class="table__row recipe_item" data-id="${item.id}">
      <td class="table__row__cell">
        <img src="${item.imageURL}" width="100px" height="100px" style="border-radius: 50%;"/>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.name}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.category}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.creator}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.createdAt}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.ratings}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.description}</p>
      </td>
    </tr>
  `;
        })
        .join("")
    : "";
};

/**
 * The renderRecipeTableTemplate function receives an array of data containing recipe information and returns an HTML string representing the recipe data table.
 * @param {Recipe[]} data - Array containing recipe information.
 * @returns {string} - HTML string representing the recipe data table.
 */
const renderRecipeTableTemplate = (data: Recipe[]): string => {
  return `
    <table class="table__wrapper toolbar__title">
      <thead class="table__head">
        <tr class="table__header">
          <th class="table__header__cell">Image</th>
          <th class="table__header__cell table-recipe__cell">Name</th>
          <th class="table__header__cell">Category</th>
          <th class="table__header__cell">Creator</th>
          <th class="table__header__cell">createdAt</th>
          <th class="table__header__cell">Ratings</th>
          <th class="table__header__cell">Description</th>
        </tr>
      </thead>

      <tbody class="table-body__recipe">
        ${recipeRowTemplateRecipe(data)}
      </tbody>
    </table>
  `;
};

/**
 * renderRecipeDetails function generates HTML markup for displaying detailed information about a recipe.
 * @param {Recipe} data - The data object containing recipe details.
 * @returns {string} - HTML string representing the recipe details.
 */
const renderRecipeDetails = (data: Recipe): string => {
  return `
    <div class="panel__edit">
      <span class="panel__icon-back drawer__user-icon icon-back"></span>
      <button class="btn__general">General</button>
    </div>

    <div class="panel__confirm" data-id=${data.id}>
      <button class="btn__delete btn__save btn-delete-recipe" id="delete-recipe">Delete</button>
      <button class="btn__save btn-edit-recipe" id="save-edit">Save</button>
    </div>

    <form class="panel__edit-profile">
      <div class="panel__item">
        <label class="panel__label">Image</label>
        <input id="image-input" type="text" class="panel__input" value=${data.imageURL}>
      </div>

      <div class="panel__item">
        <label class="panel__label">Name</label>
        <input id="recipe-name-input" type="text" class="panel__input" value=${data.name}>
      </div>

      <div class="panel__item">
        <label class="panel__label" for="recipe-category-input">Category</label>
        <select id="recipe-category-input" class="panel__input" value=${data.category}>
          <option value="">Please select</option>
          <option value="Pasta">Pasta</option>
          <option value="Pizza">Pizza</option>
          <option value="Vegan">Vegan</option>
          <option value="Desserts">Desserts</option>
          <option value="Smoothies">Smoothies</option>
          <option value="Breakfast">Breakfast</option>
        </select>
      </div>

      <div class="panel__item">
        <label class="panel__label">Creator</label>
        <input id="recipe-creator-input" type="text" class="panel__input" value=${data.creator}>
      </div>

      <div class="panel__item">
        <label class="panel__label" for="recipe-ratings-input">Ratings</label>
        <select id="recipe-ratings-input" class="panel__input" value=${data.ratings}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div class="panel__item">
        <label class="panel__label">Description</label>
        <input id="recipe-description-input" type="text" class="panel__input" value=${data.description}>
      </div>
    </form>
  `;
};

const renderListRecipesTemplate = (data: Recipe[]): string => {
  return data.length
    ? data
        .map((item: Recipe) => {
          return `
          <a href="recipe.html?id=${item.id}">
            <li class="recipes__food" data-id=${item.id}>
              <article class="card">
                <img class="card__image" src="${item.imageURL}"
                  alt="Picture cashew-vegan-rice" />
                <p class="card__name recipes__name">${item.name}</p>
              </article>
            </li>
          </a>
        `;
        })
        .join("")
    : "";
};

const renderRating = (ratings: number): string => {
  let rating = "";
  for (let i = 0; i < ratings; i++) {
    rating += '<span class="card__rating-star"></span>';
  }
  return rating;
};

const renderListRecipesByCollectionTemplate = (data: Recipe[]): string => {
  return data.length
    ? data
        .map(
          (item) => `
      <a href="recipe.html?id=${item.id}">
        <li class="delicious__item">
          <article class="card">
            <img class="card__image delicious__image"
              src="${item.imageURL}"
              alt="Picture spinach-and-cheese-pasta" />
            <div class="card__rating">${renderRating(item.ratings)}</div>
            <p class="card__name delicious__name-food">${item.name}</p>
          </article>
        </li>
      </a>
    `
        )
        .join("")
    : "";
};

const renderListRecipesBySweetTemplate = (data: Recipe[]): string => {
  return data.length
    ? data
        .map((item) => {
          return `
    <a href="recipe.html?id=${item.id}">
      <li class="delicious__item">
        <article class="card">
          <img class="card__image delicious__image" src="${item.imageURL}"
           alt="Picture spinach-and-cheese-pasta" />
          <div class="card__rating">${renderRating(item.ratings)}</div>
          <p class="card__name delicious__name-food">${item.name}</p>
        </article>
      </li>
    </a>
    `;
        })
        .join("")
    : "";
};

export {
  renderRecipeTableTemplate,
  renderRecipeDetails,
  renderListRecipesTemplate,
  renderListRecipesByCollectionTemplate,
  renderListRecipesBySweetTemplate,
};
