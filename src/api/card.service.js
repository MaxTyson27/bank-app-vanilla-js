import { Store } from "@/core/store/store";
import { exios } from "@/core/exios/exios.lib";

import notificationService from "@/core/services/notification.service";

import { NOTIFICATION_MESSAGES, NOTIFICATION_TYPES } from "@/constants/notification.const";
import { ROUTE_TYPES } from "@/constants/api-routes.const";


export class CardService {
  constructor() {
    this.store = Store.getInstance();
  }

  /**
   * Get card by current user.
   * @param {function(data): void} [onSuccess] - Callback success will be call after success request.
   * @returns {Promise} Promise object that resolved to the responce.
   */
  byUser(onSuccess) {
    const exiosOptions = {
      path: `${ROUTE_TYPES.CARDS.CARDS}/${ROUTE_TYPES.CARDS.GET_BY_USER}`,
      onSuccess,
    };

    return exios(exiosOptions);
  }

  /**
   * Update user's balance with amount and type.
   * @param {number} amount - The amount to added or withdrawal user's balance.
   * @param {'top-up', 'withdrawal'} type - Type of the transaction. either "top-up" or "withdrawal".
   * @param {function(data): void} [onSuccess] - Callback success will be call after success request.
   * @returns {Promise} Promise object that resolved to the responce.
   */
  updateBalance(amount, type, onSuccess) {
    const exiosOptions = {
      path: `${ROUTE_TYPES.CARDS.CARDS}/${ROUTE_TYPES.CARDS.BALANCE}/${type}`,
      method: 'PATCH',
      body: {
        amount: parseFloat(amount),
      },
      onSuccess: data => {
        notificationService.show(NOTIFICATION_TYPES.SUCCESS, NOTIFICATION_MESSAGES.BALANCE_CHANGED);
        onSuccess?.(data);
      }
    };

    return exios(exiosOptions);
  }

  /**
   * Transfer money between two cards numbers.
   * @param {{ amount: number; toCardNumber: string; }} param0 - Transfer details.
   * @param {*} param0.amount - The amount to be tranferred.
   * @param {*} param0.toCardNumber - The recipient's card number.
   * @param {function(data): void} [onSuccess] - Callback success will be call after success request.
   * @param {function(data): void} [onError] - Callback success will be call after error request.
   * @returns {Promise} Promise object that resolved to the responce.
   */
  transfer({amount, toCardNumber}, onSuccess, onError) {
    const exiosOptions = {
      path: `${ROUTE_TYPES.CARDS.CARDS}/${ROUTE_TYPES.CARDS.TRANSFER}`,
      method: 'PATCH',
      body: {
        amount: parseFloat(amount),
        fromCardNumber: this.store.state.user.card.number,
        toCardNumber,
      },
      onSuccess: data => {
        notificationService.show(NOTIFICATION_TYPES.SUCCESS, NOTIFICATION_MESSAGES.TRANSFER_COMPLETE);

        onSuccess?.(data);
      },
      onError: data => {
        onError?.(data);
      }
    };

    return exios(exiosOptions);
  }
  
}