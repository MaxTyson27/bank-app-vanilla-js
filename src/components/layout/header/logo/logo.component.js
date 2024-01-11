import { $R } from "@/core/rQuery/rQuery.lib";

import { ChildComponent } from "@/core/component/child.component";
import renderService from "@/core/services/render.service";

import template from './logo.template.html';
import styles from './logo.module.scss';

export class Logo extends ChildComponent {
  constructor(router) {
    super();

    this.router = router;
  }

  #handleLogoClick(event) {
    event.preventDefault();
    
    this.router.navigate('/');
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    $R(this.element).find('a').click(this.#handleLogoClick.bind(this));

    return this.element;
  }
}