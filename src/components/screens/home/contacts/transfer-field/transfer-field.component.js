import { Store } from "@/core/store/store";
import { $R } from "@/core/rQuery/rQuery.lib";

import renderService from "@/core/services/render.service";
import { CardService } from "@/api/card.service";
import { ValidationService } from "@/core/services/validation.service";
import notificationService from "@/core/services/notification.service";

import { ChildComponent } from "@/core/component/child.component";
import { Button } from "@/components/ui/button/button.component";
import { Field } from "@/components/ui/field/field.component";

import { VARIANTS } from "@/constants/variants.const";
import { BALANCE_UPDATED, TRANSACTION_COMPLETED } from "@/constants/event.const";
import { INPUT_FIELDS } from "@/constants/input-types.const";
import { NOTIFICATION_MESSAGES, NOTIFICATION_TYPES } from "@/constants/notification.const";

import template from './transfer-field.template.html';
import styles from './transfer-field.module.scss';

const LABELS = {
  SENDING: 'Sending...',
  SEND: 'Send',
  PROMT_TEXT: 'Transfer amount',
  FIELD_PLACEHOLDER: 'xxxx-xxxx-xxxx-xxxx',
};

export class TransferField extends ChildComponent {
  constructor() {
    super();

    this.state = Store.getInstance().state;
    this.cardService = new CardService();
    this.validationService = new ValidationService();
  }

  handleTransfer = (event) => {
    event.preventDefault();
    
    if (!this.state.user) {
      notificationService.show(NOTIFICATION_TYPES.ERROR, NOTIFICATION_MESSAGES.NEED_AUTH);
    }

    $R(event.target).text(LABELS.SENDING).attr('disabled', true);

    const inputElem = $R(this.element).find('input');
    const toCardNumber = inputElem.value().replaceAll('-', '');

    const reset = () => {
      $R(event.target).removeAttr('disabled').text(LABELS.SEND);
    };

    if (!toCardNumber) {
      const label = $R(this.element).find('label');

      this.validationService.showEror(label);
      reset();

      return;
    }

    let amount = prompt(LABELS.PROMT_TEXT);

    if (!amount) {
      reset();

      return;
    }

    const onSuccess = () => {
      inputElem.value('');
      amount = '';

      document.dispatchEvent(new Event(TRANSACTION_COMPLETED));
      document.dispatchEvent(new Event(BALANCE_UPDATED));
      reset();
    };

    this.cardService.transfer({ amount, toCardNumber }, onSuccess, reset);
  };

  render() {
    const field = new Field({
      name: INPUT_FIELDS.CARD_NUMBER,
      placeholder: LABELS.FIELD_PLACEHOLDER,
      variant: VARIANTS.CREDIT_CARD,
    });
    const button = new Button({
      children: LABELS.SEND,
      variant: VARIANTS.PURPLE,
      onClick: this.handleTransfer,
    });

    this.element = renderService.htmlToElement(template, [field, button], styles);

    return this.element;
  }
}