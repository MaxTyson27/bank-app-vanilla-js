import { $R } from "@/core/rQuery/rQuery.lib";

import { ChildComponent } from "@/core/component/child.component";

import renderService from "@/core/services/render.service";

import template from './user-item.template.html';
import styles from './user-item.module.scss';

export class UserItem extends ChildComponent {
  /**
   * Creates an instance of UserItem.
   * @date 09.01.2024 - 08:56:17
   *
   * @constructor
   * @param {{avatarPath: string, name: string}} user - Full props about user.
   * @param {function(Event): void} [onClick] - The optional callback func, will be call after "click" event.
   * @param {boolean} [isGray=false] - The variant of visibility component.
   */
  constructor(user, onClick, isGray = false) {
    super();

    if (!user) throw new Error('User should be passed!');
    if (!user?.name) throw new Error('User must have a "name"!');
    if (!user?.avatarPath) throw new Error('User must have an "avatarPath"!');

    this.user = user;
    this.isGray = isGray;
    this.onClick = onClick;
  }

  #preventDefault(event) {
    event.preventDefault();
  }

  update({avatarPath, name}) {
    if (!avatarPath || !name) return;

    $R(this.element).find('img').attr('src', avatarPath).attr('alt', name);
    $R(this.element).find('span').text(name);
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    this.update(this.user);

    $R(this.element).click(this.onClick || this.#preventDefault.bind(this));
    if (!this.onClick) $R(this.element).attr('disabled', '');
    if (this.isGray) $R(this.element).addClass(styles.gray);

    return this.element;
  }
}