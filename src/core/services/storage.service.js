/**
 * Class provide on interface for working with localStorage.
 * @export
 * @class StorageService
 * @typedef {StorageService}
 */
export class StorageService {

  /**
   * Save an item in localStorage.
   *
   * @param {string} key - The key under which value will be.
   * @param {*} value - The value to be stored.
   */
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Remove an item from localStorage by the provided key.
   *
   * @param {string} key - The key of the item to be removed.
   */
  removeItem(key) {
    localStorage.removeItem(key);
  }

  /**
   * Clear all data from localStorage.
   */
  clear() {
    localStorage.clear();
  }

  /**
   * Get an item from localStorage. 
   *
   * @param {string} key - The key of the item to be retrived.
   * @returns {*} - The value of the item, or null if item doesn't exist.
   */
  getItem(key) {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  }

}