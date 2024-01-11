import { ChildComponent } from "@/core/component/child.component";
import renderService from "@/core/services/render.service";

import template from './heading.template.html';
import styles from './heading.module.scss';
import { $R } from "@/core/rQuery/rQuery.lib";

export class Heading extends ChildComponent {
  /**
   * Creates an instance of Heading.
   * @date 08.01.2024 - 19:08:38
   *
   * @constructor
   * @param {string | HTMLElement} text - Content in Heading component
   */
  constructor(content) {
    super();

    if (!content) throw new Error('"content" props is required for Heading component');

    this.content = content;
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    $R(this.element).text(this.content);

    return this.element;
  }
}