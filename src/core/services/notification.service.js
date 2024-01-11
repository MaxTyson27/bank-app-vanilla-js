import { $R } from "../rQuery/rQuery.lib";
import styles from "@/components/layout/notification/notification.module.scss";

/**
 * Utility class to handle displaying notifications.
 *
 * @class NotificationService
 * @typedef {NotificationService}
 */
class NotificationService {
  #timeout;

  constructor() {
    this.#timeout = null;
  }

  #setTimeout(callback, duration) {
    if (this.#timeout) clearTimeout(this.#timeout);

    this.#timeout = setTimeout(callback, duration);
  }

  /**
   * Show a notification with specified message and type.
   * @date 10.01.2024 - 19:51:47
   *
   * @param {string} msg - Text content which will be show in notification.
   * @param {'success' | 'error'} type - The type of notification. Only 'success' or 'error' type.
   */
  show(type, msg) {
    if (!['success', 'error'].includes(type)) {
      throw new Error('Invalid notification type. Type must be "success" or "error"');
    }

    if (!msg) throw new Error('Text for notification not provided!');

    const classNames = {
      success: styles.success,
      error: styles.error,
    };

    const notificationElem = $R('#notification');

    notificationElem.text(msg).addClass(classNames[type]);

    this.#setTimeout(() => {
      notificationElem.removeClass(classNames[type]);
    }, 3000);

  }
}

export default new NotificationService();