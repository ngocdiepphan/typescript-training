import { User } from "../helpers/type-user";

/**
 * The renderUserRowTemplate function takes in an array of data containing information about the user and returns an HTML string representing the rows of the users table.
 * @param {User[]} data - Array containing information about the user (including id, username and email).
 * @returns {string} - HTML string representing rows of the users table.
 */
const renderUserRowTemplate = (data: User[]): string => {
  return data.length
    ? data
        .map((item) => {
          return `
    <tr class="table__row user-row" data-id=${item.id}>
      <td class="table__row__cell" >
        <p class="table__title user-name">${item.username}</p>
      </td>
      <td class="table__row__cell user-email">
        <p class="table__title">${item.email}</p>
      </td>
    </tr>
  `;
        })
        .join("")
    : "";
};

/**
 * The renderUserTableTemplate function takes in an array of data containing information about the user and returns an HTML string representing a table of user data.
 * @param {User[]} data - Array containing information about the user (including id, username and email).
 * @returns {string} - HTML string representing a table of user data.
 */
const renderUserTableTemplate = (data: User[]): string => {
  return `
    <table class="table__wrapper toolbar__title">
      <thead class="table__head">
        <tr class="table__header">
          <th class="table__header__cell">Full name</th>
          <th class="table__header__cell">Email</th>
        </tr>
      </thead>

      <tbody class="table__body" id="user-body">
        ${renderUserRowTemplate(data)}
      </tbody>
    </table>
  `;
};

/**
 * The renderUserDetails function takes an object containing the user's details and returns an HTML string representing that user's details.
 ** @param {User[]} data - Object containing user details (including id, username and email).
 * @returns {string} - HTML string representing user details.
 */
const renderUserDetails = (data: { id: string; username: string; email: string }): string => {
  return `
    <div class="panel__edit">
      <span class="panel__icon-back drawer__user-icon icon-back"></span>
      <button class="btn__general">General</button>
    </div>

    <div class="panel__confirm" data-id="${data.id}">
      <button class="btn__delete btn__save btn-delete-user" id="delete-user">Delete</button>
      <button class="btn__save btn-edit" id="save-edit">Save</button>
    </div>

    <form class="panel__edit-profile">
      <div class="panel__item">
        <label class="panel__label">Full Name</label>
        <input id="name-input" type="text" class="panel__input" value="${data.username}">
      </div>

      <div class="panel__item">
        <label class="panel__label">Email</label>
        <input id="mail-input" type="text" class="panel__input" value="${data.email}">
      </div>
    </form>
  `;
};

export { renderUserTableTemplate, renderUserDetails };
