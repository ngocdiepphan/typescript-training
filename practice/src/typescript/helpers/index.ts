const bindEvent = (target: EventTarget | null, type: string, callback: EventListener): void => {
  target?.addEventListener(type, callback);
};

/**
 * Check the validity of an email address.
 * @param {string} email - Email address to check.
 * @returns {boolean} - True if the email address is valid, false otherwise.
 */
const inValidEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Check the validity of a username based on minimum length.
 * @param {string} username - Username to check.
 * @param {number} minLength - Minimum length for the username.
 * @returns {boolean} - True if the username is valid, false otherwise.
 */
const inValidUsername = (username: string, minLength: number): boolean => {
  return username.trim().length >= minLength;
};

/**
 * Checks if a password is valid based on its length.
 * @param {string} password - The password to validate.
 * @param {number} maxLength - The maximum length allowed for the password.
 * @returns {boolean} - Returns true if the password is valid, false otherwise.
 */
const inValidPassword = (password: string, maxLength: number): boolean => {
  return password.trim().length <= maxLength;
};


export { bindEvent, inValidEmail, inValidUsername, inValidPassword};


