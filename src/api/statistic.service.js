import { ROUTE_TYPES } from "@/constants/api-routes.const";
import { exios } from "@/core/exios/exios.lib";

export class StatisticService {

  /**
   * Get statistics.
   * @param {function(data): void} [onSuccess] - Callback success will be call after success request.
   * @returns {Promise} Promise object that resolved to the responce.
   */
  main(onSuccess) {
    return exios({
      path: ROUTE_TYPES.STATISTICS,
      onSuccess,
    });
  }
}