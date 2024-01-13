import { ACCESS_TOKEN_KEY, USER_STORAGE_KEY } from "@/constants/auth.const";
import { StorageService } from "../services/storage.service";

export class Store {
  #targetState;
  #savedUser;
  #observers;
  /**
   * Creates an instance of Store.
   * @constructor
   * @param {Object} initialState - The initial state for the store.
   */
  constructor(initialState) {
    this.#observers = [];
    this.storageService = new StorageService();
    this.#savedUser = this.storageService.getItem(USER_STORAGE_KEY);
    this.#targetState = this.#savedUser ? { user: this.#savedUser } : initialState;
    this.state = new Proxy(this.#targetState, {
      set: (target, property, value) => {
        target[property] = value;

        this.notify();

        return true;
      }
    });
  }

  /**
   * Get the singleton instance of the Store.
   * @static
   * @returns {Store} The singleton instance of the Store.
   */
  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store({ user: null });
    }

    return Store.instance;
  }

  /**
   * Add an observer to the store's list of observers.
   * @param {Object} observer - The observer object to add.
   */
  addObserver(observer) {
    this.#observers.push(observer);
  }

  /**
   * Remove an observer to the store's list of observers.
   * @param {Objcet} observer - The observer object to remove.
   */
  removeObserver(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  /**
   * Norify all observers of the state changes.
   */
  notify() {
    this.#observers.forEach(observer => observer.update());
  }

  /**
   * Log in a user and update the state and storage service.
   * @param {Object} user - The user object to log in.
   * @param {string} accessToken - The user's access token.
   */
  login(user, accessToken) {
    this.state.user = user;
    this.storageService.setItem(USER_STORAGE_KEY, user);
    this.storageService.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  /**
  * Log out a user and update the state and storage service.
  */
  logout() {
    this.state.user = null;
    this.storageService.removeItem(USER_STORAGE_KEY);
    this.storageService.removeItem(ACCESS_TOKEN_KEY);
  }

  /**
   * Update user card.
   * @param {Object} card - Card object.
   */
  updateCard(card) {
    const oldUser = this.state.user;
    const newUser = { ...oldUser, card };
    this.state.user = newUser;
    this.storageService.setItem(USER_STORAGE_KEY, newUser);
  }
}