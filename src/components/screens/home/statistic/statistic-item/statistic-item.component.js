import { $R } from "@/core/rQuery/rQuery.lib";
import { ChildComponent } from "@/core/component/child.component";
import renderService from "@/core/services/render.service";

import template from './statistic-item.template.html';
import styles from './statistic-item.module.scss';

export class StatisticItem extends ChildComponent {
  /**
   * Creates an instance of StatisticItem.
   * @constructor
   * @param {{ label: string; value: string | number; variant: 'purple' | 'green'; }} param0
   * @param {*} param0.label
   * @param {*} param0.value
   * @param {*} param0.variant
   */
  constructor({label, value, variant}) {
    super();

    if (!label || !value || !variant) {
      throw new Error('Label, value and variant (purple or green) required!');
    }

    this.label = label;
    this.value = value;
    this.variant = variant;
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    $R(this.element).addClass(styles[this.variant]).addClass('fade-in');
    $R(this.element).find('.statistic-label').text(this.label);
    $R(this.element).find('.statistic-value').text(this.value);

    return this.element;
  }
}