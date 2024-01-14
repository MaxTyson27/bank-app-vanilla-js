import { BaseScreen } from "@/core/component/base-screen.component";
import renderService from "@/core/services/render.service";

import { CardInfo } from "./card-info/card-info.component";
import { Contacts } from "./contacts/contacts.component";
import { Transactions } from "./transactions/transactions.component";
import { Actions } from "./actions/actions.component";

import template from './home.template.html';
import styles from './home.module.scss';

export class Home extends BaseScreen{
  constructor() {
    super({title: 'Home'});
  }

  render() {
    this.element = renderService.htmlToElement(template, [CardInfo, Actions, Contacts, Transactions], styles);

    return this.element;
  }
}