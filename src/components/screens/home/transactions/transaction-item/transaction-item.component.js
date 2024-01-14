import { $R } from "@/core/rQuery/rQuery.lib";

import { ChildComponent } from "@/core/component/child.component";

import renderService from "@/core/services/render.service";

import { formatDate } from "@/utils/format/format-date";
import { formatToCurrency } from "@/utils/format/format-to-currency";

import template from './transaction-item.template.html';
import styles from './transaction-item.module.scss';

const INCOME = 'income';

export class TransactionItem extends ChildComponent {
  constructor({type, date, amount}) {
    super();

    this.type = type;
    this.date = date;
    this.amount = amount;
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    $R(this.element).find('.transaction-name').text(this.type);
    $R(this.element).find('.transaction-date').text(formatDate(this.date));
    $R(this.element).find('.transaction-amount').text(formatToCurrency(this.amount));
    if (this.type.toLowerCase() === INCOME) {
      $R(this.element).addClass(styles.income);
    }

    return this.element;
  }
}