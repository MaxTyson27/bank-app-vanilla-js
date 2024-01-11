/**
 * Formats a credit card number string by adding dashes (-) after every 4th character.
 * @date 08.01.2024 - 18:50:35
 * @param {string} cardNumber - The credit card number string to format.
 * @returns {string} - Returns the formatted credit card number string.
*/
export const formatCardNumberWithDashes = (cardNumber) => {
  return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-');
};