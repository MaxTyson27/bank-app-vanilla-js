import { ROUTE_TYPES } from "@/constants/api-routes.const";
import { exios } from "@/core/exios/exios.lib";

export class TransactionService {
  /**
   * Get all transactions.
   * @param {function(data): void} [onSuccess] - Callback success will be call after success request.
   * @returns {Promise} Promise object that resolved to the responce.
   */
  getAll(onSuccess){
    const data = {
      path: ROUTE_TYPES.TRANSACTIONS + `?${new URLSearchParams({
        orderBy: 'desc'
      })}`,
      onSuccess,
    };

    return exios(data);
  }
}