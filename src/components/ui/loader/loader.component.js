import { ChildComponent } from "@/core/component/child.component";
import renderService from "@/core/services/render.service";

import template from './loader.template.html';
import styles from './loader.module.scss';
import { $R } from "@/core/rQuery/rQuery.lib";

export const LOADER_SELECTOR = '[data-component="loader"]';

export class Loader extends ChildComponent {
  /**
   * Creates an instance of Loader.
   * @date 08.01.2024 - 22:03:00
   *
   * @constructor
   * @param {number} [width=100]
   * @param {number} [height=100]
   */
  constructor(width = 100, height = 100) {
    super();

    this.width = width;
    this.height = height;
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    $R(this.element)
      .css('width', `${this.width}px`)
      .css('height', `${this.height}px`)
      .addClass('bounce');

    return this.element;
  }
}