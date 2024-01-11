import renderService from "@/core/services/render.service";

import { ChildComponent } from "@/core/component/child.component";
import { UserItem } from "@/components/ui/user-item/user-item.component";
import { Logo } from "./logo/logo.component";
import { LogoutButton } from "./logout-button/logout-button.component";
import { Search } from "./search/search.component";

import template from './header.template.html';
import styles from './header.module.scss';

export class Header extends ChildComponent {
  constructor(router) {
    super();

    this.router = router;
  }

  render() {
    const userItem = new UserItem({
      avatarPath: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-367-456319.png',
      name: 'Michelangelo',
    });
    const logoutButton = new LogoutButton({
      router: this.router,
    });
    const logo = new Logo(this.router);

    this.element = renderService.htmlToElement(template, [logo, logoutButton, Search, userItem], styles);

    return this.element;
  }
}