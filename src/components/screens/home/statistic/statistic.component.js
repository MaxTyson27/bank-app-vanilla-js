import { Store } from "@/core/store/store";

import { Heading } from "@/components/ui/heading/heading.component";
import { ChildComponent } from "@/core/component/child.component";

import { StatisticService } from "@/api/statistic.service";
import renderService from "@/core/services/render.service";

import { TRANSACTION_COMPLETED } from "@/constants/event.const";

import template from './statistic.template.html';
import styles from './statistic.module.scss';
// import notificationService from "@/core/services/notification.service";
// import { NOTIFICATION_MESSAGES, NOTIFICATION_TYPES } from "@/constants/notification.const";
import { LOADER_SELECTOR } from "@/constants/selectors.const";
import { $R } from "@/core/rQuery/rQuery.lib";
import { StatisticItem } from "./statistic-item/statistic-item.component";
import { formatToCurrency } from "@/utils/format/format-to-currency";
import { VARIANTS } from "@/constants/variants.const";
import { CircleChart } from "./circle-chart/circle-chart.component";

const LABELS = {
  TITLE: 'Statistic',
  INCOME: 'Income',
  EXPENSE: 'Expense',
};

export class Statistic extends ChildComponent {
  constructor() {
    super();

    this.state = Store.getInstance().state;
    this.statisticService = new StatisticService();

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

  renderChart(income, expense) {
    const total = income + expense;
    let incomePercent = (income * 100) / total;
    let expensePercent = (expense * 100) / total;

    if (income && !expense) {
      incomePercent = 100;
      expensePercent = 0.1;
    }

    if (!income && expense) {
      incomePercent = 0.1;
      expensePercent = 100;
    }

    return new CircleChart(incomePercent, expensePercent).render();
  }

  fetchData() {
    if (!this.state.user) {
      // notificationService.show(NOTIFICATION_TYPES.ERROR, NOTIFICATION_MESSAGES.NEED_AUTH);

      return;
    }

    this.statisticService.main((data) => {
      if (!data) return;

      const loaderElem = this.element.querySelector(LOADER_SELECTOR);
      if (loaderElem) loaderElem.remove();

      const statisticItemsElem = $R(this.element).find('#statistic-items');
      statisticItemsElem.html('');

      const circleChartElem = $R(this.element).find('#circle-chart');
      circleChartElem.html('');

      statisticItemsElem.append(
        new StatisticItem({
          label: LABELS.INCOME,
          value: formatToCurrency(data[0].value),
          variant: VARIANTS.GREEN,
        }).render()
      ).append(
        new StatisticItem({
          label: LABELS.EXPENSE,
          value: formatToCurrency(data[1].value),
          variant: VARIANTS.PURPLE,
        }).render()
      );

      circleChartElem.append(this.renderChart(data[0].value, data[1].value));
    });
  }

  render() {
    this.fetchData();

    return this.element;
  }
}