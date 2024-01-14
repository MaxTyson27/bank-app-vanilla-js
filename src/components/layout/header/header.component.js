import { $R } from "@/core/rQuery/rQuery.lib";
import { Store } from "@/core/store/store";

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

    this.store = Store.getInstance();
    this.router = router;

    this.store.addObserver(this);

    this.userItem = new UserItem({
      avatarPath: '/',
      name: 'no-name',
    });
  }

  update() {
    this.user = this.store.state.user;
    const authSideElement = $R(this.element).find('#auth-side');

    if (this.user) {
      this.userItem.update(this.user);
      authSideElement.show();
      this.router.navigate('/');
    } else {
      authSideElement.hide();
    }
  }

  render() {
    const logoutButton = new LogoutButton({
      router: this.router,
    });
    const logo = new Logo(this.router);

    this.element = renderService.htmlToElement(template, [logo, logoutButton, Search, this.userItem], styles);

    this.update();

    return this.element;
  }
}