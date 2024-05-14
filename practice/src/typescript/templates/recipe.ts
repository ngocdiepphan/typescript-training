import { Recipe } from "../helpers/type-recipe";
/**
 * The recipeRowTemplateRecipe function receives an array of data containing recipe information and returns an HTML string representing the rows of the recipe table.
 * @param {Recipe[]} data - Array containing recipe information.
 * @returns {string} - HTML string representing the rows of the recipes table.
 */
const recipeRowTemplateRecipe = (data: Recipe[]): string => {
  return data.length ? data.map((item) => {
    return `
    <tr class="table__row recipe_item" data-id=${item.id}>
      <td class="table__row__cell">
        <img src=${item.imageURL} width="100px" height="100px" style="border-radius: 50%;"/>
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
  `;}).join("") : "";
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

export {
  renderRecipeTableTemplate,
};
