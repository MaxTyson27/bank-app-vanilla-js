import { $R } from "@/core/rQuery/rQuery.lib";

import { BaseScreen } from "@/core/component/base-screen.component";
import { Button } from "@/components/ui/button/button.component";
import { Field } from "@/components/ui/field/field.component";

import renderService from "@/core/services/render.service";
import { AuthService } from "@/api/auth.service";
import { ValidationService } from "@/core/services/validation.service";
import { FormService } from "@/core/services/form.service";

import { INPUT_FIELDS } from "@/constants/input-types.const";

import template from './auth.template.html';
import styles from './auth.module.scss';
import { ROUTE_TYPES } from "@/constants/api-routes.const";

const LABELS = {
  EMAIL_PLACEHOLDER: 'Enter email',
  PASSWORD_PLACEHOLDER: 'Enter password',
  TITLE: {
    SING_IN: 'Sign in',
    REGISTER: 'Register',
  },
};

export class Auth extends BaseScreen {
  #isLogin = true;

  constructor() {
    super({title: 'Auth'});
    
    this.formService = new FormService();
    this.authService = new AuthService();
    this.validationService = new ValidationService();
  }

  #validateFields(preparedFields) {
    const emailLabel = $R(this.element).find('label:first-child');
    const passwordLabel = $R(this.element).find('label:last-child');

    if (!preparedFields.email) {
      this.validationService.showEror(emailLabel);
    }

    if (!preparedFields.password) {
      this.validationService.showEror(passwordLabel);
    }

    return preparedFields.email && preparedFields.password;
  }

  #handleSubmit(event) {
    const preparedFields = this.formService.prepareFields(event.target);

    if (!this.#validateFields(preparedFields)) return;

    const authType = this.#isLogin ? ROUTE_TYPES.AUTH.LOGIN : ROUTE_TYPES.AUTH.REGISTER;

    this.authService.main(authType, preparedFields);
  }

  #changFormType(event) {
    event.preventDefault();

    this.#isLogin = !this.#isLogin;

    $R(this.element).find('h1')
      .text(this.#isLogin ? LABELS.TITLE.SING_IN : LABELS.TITLE.REGISTER);

    $R(this.element).find('#change-form-type')
      .text(this.#isLogin ? LABELS.TITLE.REGISTER : LABELS.TITLE.SING_IN);
  }

  #appendInputs() {
    $R(this.element).find('#auth-inputs').append(
      new Field({
        placeholder: LABELS.EMAIL_PLACEHOLDER,
        name: INPUT_FIELDS.EMAIL,
        type: INPUT_FIELDS.EMAIL,
      }).render()
    ).append(
      new Field({
        placeholder: LABELS.EMAIL_PLACEHOLDER,
        name: INPUT_FIELDS.PASSWORD,
        type: INPUT_FIELDS.PASSWORD,
    }).render());
  }

  render() {
    const button = new Button({
      children: 'Submit',
    });

    this.element = renderService.htmlToElement(template, [button], styles);

    this.#appendInputs();
    $R(this.element).find('#change-form-type').click(this.#changFormType.bind(this));
    $R(this.element).find('form').submit(this.#handleSubmit.bind(this));


    return this.element;
  }
}