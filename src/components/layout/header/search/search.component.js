import { ChildComponent } from "@/core/component/child.component";
import renderService from "@/core/services/render.service";

import template from './search.template.html';
import styles from './search.module.scss';
import { $R } from "@/core/rQuery/rQuery.lib";

export class Search extends ChildComponent {
  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    $R(this.element)
      .find('input')
      .input({
        type: 'search',
        name: 'search',
        placeholder: 'Search users...',
      });

    return this.element;
  }
}