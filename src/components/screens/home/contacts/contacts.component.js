import { $R } from "@/core/rQuery/rQuery.lib";
import { Store } from "@/core/store/store";
import { ChildComponent } from "@/core/component/child.component";

import renderService from "@/core/services/render.service";
import { UserService } from "@/api/user.service";

import { Heading } from "@/components/ui/heading/heading.component";
import { UserItem } from "@/components/ui/user-item/user-item.component";
import { Loader } from "@/components/ui/loader/loader.component";
import { TransferField } from "./transfer-field/transfer-field.component";

import { formatCardNumberWithDashes } from "@/utils/format/format-card-number";

import { CONTACTS_LIST_SELECTOR, LOADER_SELECTOR, SELECTOR_CARD_NUMBER } from "@/constants/selectors.const";

import template from './contacts.template.html';
import styles from './contacts.module.scss';

const LABELS = {
  TITLE: 'Transfer money',
};


export class Contacts extends ChildComponent {
  constructor() {
    super();

    this.state = Store.getInstance().state;
    this.userService = new UserService();
  }

  fetchData() {
    this.userService.getAll(null, data => {
      if (!data) return;

      this.element.querySelector(LOADER_SELECTOR).remove();

      for (const user of data){
        const onClickUser = () => {
          $R(SELECTOR_CARD_NUMBER).value(formatCardNumberWithDashes(user.card.number));
        };

        const userItem = new UserItem(user, onClickUser, true).render();

        $R(this.element).find(CONTACTS_LIST_SELECTOR).append(userItem);
      }

      $R(this.element)
        .find(CONTACTS_LIST_SELECTOR)
        .findAll('button')
        .forEach(button => {
          button.addClass('fade-in');
        });
    });
  }

  render() {
    const heading = new Heading(LABELS.TITLE);

    this.element = renderService.htmlToElement(template, [heading, TransferField], styles);

    if (this.state.user) {
      $R(this.element).find(CONTACTS_LIST_SELECTOR).html(new Loader().render().outerHTML);

      this.fetchData();
    }

    return this.element;
  }
}