import { exios } from "@/core/exios/exios.lib";

import notificationService from "@/core/services/notification.service";

import { NOTIFICATION_TYPES } from "@/constants/notification.const";
import { ROUTE_TYPES } from "@/constants/api-routes.const";

const LABELS = {
  SUCCESS_LOGIN: 'You have successfully logged in',
};

export class AuthService {
  constructor() {
    //store
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
      path: `${ROUTE_TYPES.AUTH}/${type}`,
      body,
      onSuccess: () => {
        notificationService.show(NOTIFICATION_TYPES.SUCCESS, LABELS.SUCCESS_LOGIN);
      },
      method: 'POST'
    };

    return exios(exiosOptions);
  }
}