import { exios } from "@/core/exios/exios.lib";

import { Store } from "@/core/store/store";

import notificationService from "@/core/services/notification.service";

import { NOTIFICATION_MESSAGES, NOTIFICATION_TYPES } from "@/constants/notification.const";
import { ROUTE_TYPES } from "@/constants/api-routes.const";

export class AuthService {
  constructor() {
    this.store = Store.getInstance();
  }

  /**
   * Main method for authorization or login of user.
   *
   * @param {'login' | 'register'} type - Type of the login or register user. Only "login" or "register".
   * @param {*} body - The request payload to send as JSON.
   * @returns {Promise} Promise object that resolved to the responce.
   */
  main(type, body) {
    const exiosOptions = {
      path: `${ROUTE_TYPES.AUTH.AUTH}/${type}`,
      body,
      onSuccess: data => {
        this.store.login(data.user, data.accessToken);
        notificationService.show(NOTIFICATION_TYPES.SUCCESS, NOTIFICATION_MESSAGES.SUCCESS_LOGIN);
      },
      method: 'POST'
    };

    return exios(exiosOptions);
  }
}