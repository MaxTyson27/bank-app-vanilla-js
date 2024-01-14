import { ChildComponent } from "@/core/component/child.component";
import renderService from "@/core/services/render.service";

import template from './auth-message.template.html';
import styles from './auth-message.module.scss';

export class AuthMessage extends ChildComponent {
  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    return this.element;
  }
}