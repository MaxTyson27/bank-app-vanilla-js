import { $R } from "@/core/rQuery/rQuery.lib";

import renderService from "@/core/services/render.service";

import { ChildComponent } from "@/core/component/child.component";

import { VARIANTS } from "@/constants/variants.const";

import template from './field.template.html';
import styles from './field.module.scss';
import { INPUT_TYPES } from "@/constants/input-types.const";

export class Field extends ChildComponent {
  /**
   * Creates an instance of Field.
   * @date 07.01.2024 - 19:57:26
   *
   * @constructor
   * @param {{ placeholder?: string; type?: string; value?: string; name: string; variant: any; onInput: function(value): void}} props
   * @param {string} [props.placeholder=''] - input's placeholder
   * @param {string} [props.type='text'] - input's type
   * @param {string} [props.value=''] - input's value
   * @param {*} props.name - "name" attribute for input
   * @param {*} [props.variant] - Variant of style to input
   * @param {*} props.onInput - Function will be call in event listener input.
   */
  constructor({
    placeholder = '',
    type = INPUT_TYPES.TEXT,
    value = '',
    name,
    variant,
    onInput,
  }) {
    super();

    if (!name) throw new Error('Please fill props "name"!');

    this.placeholder = placeholder;
    this.type = type;
    this.value = value;
    this.name = name;
    this.variant = variant;
    this.onInput = onInput;
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    const inputElement = $R(this.element).find('input').input({
      placeholder: this.placeholder,
      type: this.type,
      value: this.value,
      name: this.name,
      variant: this.variant,
      onInput: this.onInput,
    });

    if (this.type === INPUT_TYPES.NUMBER) {
      inputElement.numberInput(this.onInput);
    }

    const isCreditCard = this.variant === VARIANTS.CREDIT_CARD;

    if (isCreditCard) {
      inputElement.creditCardInput(this.onInput);
    }

    return this.element;
  }
}