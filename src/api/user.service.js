import { ROUTE_TYPES } from "@/constants/api-routes.const";
import { exios } from "@/core/exios/exios.lib";

export class UserService {
  /**
   * Get all users from.
   * @param {string} searchTerm
   * @param {function(data): void} [onSuccess] - Callback success will be call after success request.
   * @returns {Promise} Promise object that resolved to the responce.
   */
  getAll(searchTerm, onSuccess) {
    const term = searchTerm ? new URLSearchParams({searchTerm}) : '';

    const data = {
      path: `${ROUTE_TYPES.USERS}/?${term}`,
      onSuccess,
    };

    return exios(data);
  }
}