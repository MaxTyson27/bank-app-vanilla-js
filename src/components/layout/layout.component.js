
import { $R } from '@/core/rQuery/rQuery.lib';
import renderService from '@/core/services/render.service';

import template from './layout.template.html';
import styles from './layout.module.scss';
import { Header } from './header/header.component';
import { ChildComponent } from '@/core/component/child.component';

export class Layout extends ChildComponent {
  constructor({children, router}) {
    super();

    this.router = router;
    this.children = children;
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    const mainElement = $R(this.element).find('main');

    const contentContainer = $R(this.element).find('#content');
    contentContainer.append(this.children);

    mainElement.before(new Header(this.router).render()).append(contentContainer.element);
    
    return this.element;
  }
}