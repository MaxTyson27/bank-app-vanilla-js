import { $R } from "@/core/rQuery/rQuery.lib";
import { Store } from "@/core/store/store";

import renderService from "@/core/services/render.service";

import { BaseScreen } from "@/core/component/base-screen.component";
import { CardInfo } from "./card-info/card-info.component";
import { Contacts } from "./contacts/contacts.component";
import { Transactions } from "./transactions/transactions.component";
import { Statistic } from "./statistic/statistic.component";
import { AuthMessage } from "@/components/ui/auth-message/auth-message.component";
import { Actions } from "./actions/actions.component";

import template from './home.template.html';
import styles from './home.module.scss';

export class Home extends BaseScreen{
  constructor() {
    super({title: 'Home'});

    this.store = Store.getInstance();
    this.store.addObserver(this);

    this.components = {
      cardInfo: null,
      transactions: null,
      statistic: null,
    };
  }

  createOrUpdateComponent(component, componentName) {
    if (this.components[componentName]) {
      this.components[componentName].destroy();
    }

    this.components[componentName] = new component();

    return this.components[componentName];
  }

  update() {
    this.user = this.store.state.user;

    if (!this.user) {
      $R(this.element).html(new AuthMessage().render().outerHTML);
    }
  }

  render() {
    const componentsToRender = [
      this.createOrUpdateComponent(CardInfo, 'cardInfo'),
      this.createOrUpdateComponent(Transactions, 'transactions'),
      this.createOrUpdateComponent(Statistic, 'statistic'),
      Contacts,
      Actions,
    ];

    this.element = renderService.htmlToElement(template, componentsToRender, styles);

    this.update();

    return this.element;
  }
}