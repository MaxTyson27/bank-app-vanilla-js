import { ChildComponent } from "@/core/component/child.component";
import renderService from "@/core/services/render.service";

import template from './button.template.html';
import styles from './button.module.scss';
import { $R } from "@/core/rQuery/rQuery.lib";

const BUTTON_STYLES = {
  GREEN: 'green',
  PURPLE: 'purple',
};

export class Button extends ChildComponent {
  #isRightVariant;
  /**
   * Creates an instance of Button.
   * @date 07.01.2024 - 19:28:10
   *
   * @constructor
   * @param {{ children: number | string | HTMLElement; onClick: function(): void; variant?: 'green' | 'purple'; }} props
   * @param {*} props.children - Children will be paste in content piece tag of button.
   * @param {*} props.onClick - Callback function on click event listener.
   * @param {*} [props.variant] - Variants of button style.
   */
  constructor({children, onClick, variant}) {
    super();

    if (!children) throw new Error(`Children props is required for Button, but children is "${children}"!`);

    this.children = children;
    this.onClick = onClick;
    this.variant = variant;

    this.#setVariant();
  }

  #setVariant() {
    switch(this.variant) {
      case BUTTON_STYLES.GREEN:
      case BUTTON_STYLES.PURPLE: {
        this.#isRightVariant = true;

        break;
      }

      default: {
        this.#isRightVariant = false;
      }
    }
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    $R(this.element).html(this.children).click(this.onClick);

    if (this.#isRightVariant) $R(this.element).addClass(styles[this.variant]);

    return this.element;
  }
}