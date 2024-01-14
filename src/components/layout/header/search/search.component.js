import { $R } from "@/core/rQuery/rQuery.lib";

import { ChildComponent } from "@/core/component/child.component";
import { UserItem } from "@/components/ui/user-item/user-item.component";

import { UserService } from "@/api/user.service";
import renderService from "@/core/services/render.service";

import { SELECTOR_CARD_NUMBER } from "@/constants/selectors.const";

import { debounce } from "@/utils/debounce.utils";
import { formatCardNumberWithDashes } from "@/utils/format/format-card-number";

import template from './search.template.html';
import styles from './search.module.scss';

export class Search extends ChildComponent {
  constructor() {
    super();

    this.userService = new UserService();
  }

  async #handleSearch(event) {
    const searchTerm = event.target.value;
    const searchResultElem = $R(this.element).find('#search-results');

    if (!searchTerm) {
      searchResultElem.html('');

      return;
    }

    await this.userService.getAll(searchTerm, (users) => {
      searchResultElem.html('');

      users.forEach((user, idx) => {
        const userItem = new UserItem(
          user,
          () => {
            searchResultElem.html('');
            $R(SELECTOR_CARD_NUMBER).value(formatCardNumberWithDashes(user.card.number));
          },
          true,
        ).render();

        $R(userItem)
          .addClass(styles.item)
          .css('transition-delay', `${idx * 0.1}s`);

        searchResultElem.append(userItem);

        setTimeout(() => {
          $R(userItem).addClass(styles.visible);
        }, 50);
      });
    });
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    const debounceHandleSearch = debounce(this.#handleSearch.bind(this), 300);

    $R(this.element)
      .find('input')
      .input({
        type: 'search',
        name: 'search',
        placeholder: 'Search users...',
      }).on('input', debounceHandleSearch);

    return this.element;
  }
}