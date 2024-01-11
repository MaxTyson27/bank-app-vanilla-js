import { $R } from "../rQuery/rQuery.lib";

class NotificationService {
  /**
   * Show notification with text.
   * @date 10.01.2024 - 19:51:47
   *
   * @param {string} text - Text content which will be show in notification.
   * @returns {this} - The curreent NotificationService instance.
   */
  show(text) {
    if (!text) throw new Error('Text for notification not provided!');

    $R('#notification').text(text).css('left', '10px');

    return this;
  }
}

export default new NotificationService();