import { $R } from "@/core/rQuery/rQuery.lib";
import { ChildComponent } from "@/core/component/child.component";
import { Store } from "@/core/store/store";

import renderService from "@/core/services/render.service";
import { CardService } from "@/api/card.service";
import { ValidationService } from "@/core/services/validation.service";
import notificationService from "@/core/services/notification.service";

import { Button } from "@/components/ui/button/button.component";
import { Field } from "@/components/ui/field/field.component";

import { NOTIFICATION_MESSAGES, NOTIFICATION_TYPES } from "@/constants/notification.const";
import { BALANCE_UPDATED } from "@/constants/event.const";
import { INPUT_FIELDS, INPUT_TYPES } from "@/constants/input-types.const";
import { ROUTE_TYPES } from "@/constants/api-routes.const";
import { VARIANTS } from "@/constants/variants.const";

import template from './actions.template.html';
import styles from './actions.module.scss';

const LABELS = {
  PLACEHOLDER: 'Enter amount:',
  TOP_UP_BTN: 'Top up',
  WITHDRAWAL_BTN: 'Withdrawal',
  SENDING: 'Sending...',
};

export class Actions extends ChildComponent {
  constructor() {
    super();

    this.state = Store.getInstance().state;
    this.cardService = new CardService();
    this.validationService = new ValidationService();

    this.topUpBtn = new Button({
      children: LABELS.TOP_UP_BTN,
      variant: VARIANTS.GREEN,
      onClick: event => this.updateBanalce(event, ROUTE_TYPES.CARDS.TOP_UP),
    }).render();
    this.withdrawalBtn = new Button({
      children: LABELS.WITHDRAWAL_BTN,
      variant: VARIANTS.PURPLE,
      onClick: event => this.updateBanalce(event, ROUTE_TYPES.CARDS.WITHDRAWAL),
    }).render();
  }

  /**
   * @param {Event} event
   * @param {'top-up' | 'withdrawal'} type
   */
  async updateBanalce(event, type) {
    event.preventDefault();
    
    if(!this.state.user) {
      notificationService.show(NOTIFICATION_TYPES.ERROR, NOTIFICATION_MESSAGES.NEED_AUTH);

      return;
    }

    $R(event.target).text(LABELS.SENDING).attr('disabled', true);

    const inputElem = $R(this.element).find('input');
    const amount = inputElem.value();

    if (!amount) {
      const label = $R(this.element).find('label');

      this.validationService.showEror(label);

      $R(event.target).removeAttr('disabled').text(type);

      return;
    }

    const onSuccess = () => {
      inputElem.value('');
      $R(event.target).removeAttr('disabled').text(type);

      const balanceUpdatedEvent = new Event(BALANCE_UPDATED);
      document.dispatchEvent(balanceUpdatedEvent);
    };

    await this.cardService.updateBalance(amount, type, onSuccess);
  }

  render() {
    const field = new Field({
      placeholder: LABELS.PLACEHOLDER,
      name: INPUT_FIELDS.AMOUNT,
      type: INPUT_TYPES.NUMBER,
    });

    this.element = renderService.htmlToElement(template, [field], styles);

    $R(this.element).find('#actions-buttons')
      .append(this.topUpBtn)
      .append(this.withdrawalBtn);

    return this.element;
  }
}