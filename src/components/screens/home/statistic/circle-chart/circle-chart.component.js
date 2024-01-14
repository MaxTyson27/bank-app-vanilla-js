import { ChildComponent } from "@/core/component/child.component";
import renderService from "@/core/services/render.service";

import template from './circle-chart.template.html';
import styles from './circle-chart.module.scss';
import { DonutChart } from "@/components/ui/donut-chart/donut-chart.component";

export class CircleChart extends ChildComponent {
  constructor(incomePercent, expensePercent) {
    super();

    this.incomePercent = incomePercent;
    this.expensePercent = expensePercent;
  }

  render() {
    const donutChart = new DonutChart([
      { value: this.incomePercent, color: '#08f0c8' },
      { value: this.expensePercent, color: '#917cff' },
    ]);
    this.element = renderService.htmlToElement(template, [donutChart], styles);

    return this.element;
  }
}