import { User } from "../services/helper";

/**
 * The userRowTemplate function takes in an array of data containing information about the user and returns an HTML string representing the rows of the users table.
 * @param {User[]} data - Array containing information about the user (including id, username and email).
 * @returns {string} - HTML string representing rows of the users table.
 */
const userRowTemplate = (data: User[]): string => {
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
        ${userRowTemplate(data)}
      </tbody>
    </table>
  `;
};

export { renderUserTableTemplate };
