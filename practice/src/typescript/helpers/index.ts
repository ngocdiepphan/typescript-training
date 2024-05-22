const bindEvent = (
  target: EventTarget | null,
  type: string,
  callback: EventListener
): void => {
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

/**
 * Attach an event to a parent element, but only execute the event handler function when the event is triggered on a child element that satisfies the given condition (selector).
 *
 * @param {HTMLElement} target - The parent element to which the event will be attached.
 * @param {string} selector - Selector to identify the child element on which the event will be fired.
 * @param {string} type - Event type, for example: 'click', 'submit', etc.
 * @param {Function} handler - The event handler function will be executed when an event is triggered on a child element that satisfies the condition (selector).
 */
const delegate = (
  target: HTMLElement,
  selector: string,
  type: string,
  handler: (event: Event) => void
): void => {
  
  /**
   * dispatchEvent: Function to dispatch the event to the matching child element.
   * This function checks if the event target matches the selector and if so, calls the handler function.
   *
   * @param {Event} event - The event object.
   */
  const dispatchEvent = (event: Event): void => {
    const targetElement = event.target as HTMLElement;

    const potentialElements = target.querySelectorAll(selector);

    // Check if the closest matching element to the event target is within the potential elements
    const hasMatch =
      Array.prototype.indexOf.call(
        potentialElements,
        targetElement.closest(selector)
      ) >= 0;

    // If a matching element is found, call the handler function with the event
    if (hasMatch) handler.call(targetElement, event);
  };

  target.addEventListener(type, dispatchEvent);
};

export { bindEvent, inValidEmail, inValidUsername, inValidPassword, delegate };
