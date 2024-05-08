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
 * Check the validity of a password based on minimum length.
 * @param {string} password - Password to check.
 * @param {number} length - Minimum length for the password.
 * @returns {boolean} - True if the password is valid, otherwise returns false.
 */
const inValidPassword = (password: string, length: number): boolean => {
  return password.trim().length >= length;
};

export { bindEvent, inValidEmail, inValidUsername, inValidPassword};


