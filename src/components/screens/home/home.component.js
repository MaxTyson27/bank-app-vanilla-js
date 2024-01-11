import { BaseScreen } from "@/core/component/base-screen.component";
import renderService from "@/core/services/render.service";

import template from './home.template.html';
import styles from './home.module.scss';

export class Home extends BaseScreen{
  constructor() {
    super({title: 'Home'});
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    return this.element;
  }
}