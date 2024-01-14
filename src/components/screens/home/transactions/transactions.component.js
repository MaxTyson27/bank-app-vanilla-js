import { $R } from "@/core/rQuery/rQuery.lib";
import { Store } from "@/core/store/store";

import { TransactionService } from "@/api/transaction.service";
import notificationService from "@/core/services/notification.service";
import renderService from "@/core/services/render.service";

import { Heading } from "@/components/ui/heading/heading.component";
import { TransactionItem } from "./transaction-item/transaction-item.component";
import { ChildComponent } from "@/core/component/child.component";

import { TRANSACTION_COMPLETED } from "@/constants/event.const";
import { NOTIFICATION_MESSAGES, NOTIFICATION_TYPES } from "@/constants/notification.const";

import template from './transactions.template.html';
import styles from './transactions.module.scss';
import { LOADER_SELECTOR } from "@/constants/selectors.const";

const LABELS = {
  TITLE: 'Recent transactions',
  NOT_FOUND: 'Transactions not found',
};

const TRANSACTION_TYPES = {
  WITHDRAWAL: 'Expense',
  TOP_UP: 'Income',
};

export class Transactions extends ChildComponent {
  constructor() {
    super();

    this.state = Store.getInstance().state;
    this.transactionService = new TransactionService();

    this.element = renderService.htmlToElement(template, [new Heading(LABELS.TITLE)], styles);

    this.#addListeners();
  }

  #addListeners() {
    document.addEventListener(TRANSACTION_COMPLETED, this.#onTransactionCompleted);
  }

  #removeListeners() {
    document.removeEventListener(TRANSACTION_COMPLETED, this.#onTransactionCompleted);
  }

  #onTransactionCompleted = () => {
    this.fetchData();
  };

  destroy = () => {
    this.#removeListeners();
  };

  fetchData() {
    if (!this.state.user) {
      notificationService.show(NOTIFICATION_TYPES.ERROR, NOTIFICATION_MESSAGES.NEED_AUTH);

      return;
    }

    this.transactionService.getAll((data) => {
      if (!data) return;

      const loaderElem = this.element.querySelector(LOADER_SELECTOR);
      const transactionsList = $R(this.element).find('#transactions-list');
      transactionsList.html('');

      if (loaderElem) loaderElem.remove();

      if (!data.length) return transactionsList.text(LABELS.NOT_FOUND);

      data.transactions.forEach(transaction => {
        const type = TRANSACTION_TYPES[transaction.type];
        const element = new TransactionItem({
          type,
          date: transaction.createdAt,
          amount: transaction.amount,
        }).render();

        transactionsList.append(element);
      });
      
    });
  }

  render() {
    this.fetchData();

    return this.element;
  }
}