import { INPUT_TYPES } from "@/constants/input-types.const";
import { VARIANTS } from "@/constants/variants.const";
import { formatCardNumberWithDashes } from "@/utils/format/format-card-number";

/**
 * Represents the RQuery class for working with DOM-elements.
 * @date 06.01.2024 - 15:51:54
 *
 * @class RQuery
 * @typedef {RQuery}
 */
class RQuery {
  /**
   * Creates an instance of RQuery.
   * @date 06.01.2024 - 15:57:57
   *
   * @constructor
   * @param {string | HTMLElement} selector
   */
  constructor(selector) {
    if (typeof selector === 'string') {
      this.element = document.querySelector(selector);

      if (!this.element) {
        throw new Error(`Element ${selector} not found!`);
      }
    } else if (selector instanceof HTMLElement) {
      this.element = selector;
    } else {
      throw new Error('Invalid selector type.');
    }
  }

  /**
   * Check current element tag name.
   * @date 08.01.2024 - 18:36:47
   *
   * @param {string} tagName - The tag name for checking.
   * @returns {boolean} - Boolean result checking.
   */
  #isTagName(tagName) {
    return this.element.tagName.toLowerCase() === tagName;
  }

  /**
   * Set attributes and event listeners for an input element.
   * @date 07.01.2024 - 20:01:34
   * @param {Object} options - An object containing input options.
   * @param {function(Event): void} [options.onInput] - The event listener for the input's input event.
   * @param {object} [options.rest] - Optional attributes to set on the input element.
   * @param {string} [options.variant] - Optional variant of style to input.
   * @returns {RQuery} - The current RQuery instance.
   */
  input({onInput, variant, ...rest}) {
    if (!this.#isTagName('input'))
      throw new Error('Element must be an input!');

    for (const [key, value] of Object.entries(rest)) {
      this.element.setAttribute(key, value);
    }

    if (onInput) {
      if ((variant && variant === VARIANTS.CREDIT_CARD) || rest.type === INPUT_TYPES.NUMBER)
        return this;

      this.element.addEventListener('input', onInput);
    }

    return this;
  }

  /**
   * Set attributes and event listeners for a number input element.
   * @date 08.01.2024 - 18:26:21
   *
   * @param {number} limit - Max length of input value.
   * @param {function(value): void} [onInput] - The event listener for the input's input event.
   * @returns {RQuery} - The current RQuery instance.
   */
  numberInput(onInput, limit) {
    if (
      !this.#isTagName('input') &&
      this.element.type !== 'number'
    ) throw new Error('Element must be an input with type "number"');

    this.element.addEventListener('input', event => {
      let value = event.target.value.replace(/[^0-9]g/, '');

      if (limit) value = value.substring(0, limit);

      event.target.value = value;

      onInput?.(event.target.value);
    });

    return this;
  }

  /**
   * Set attributes and event listeners for a number input element.
   * @date 08.01.2024 - 18:26:21
   * @param {function(value): void} [onInput] - The event listener for the input's input event.
   * @returns {RQuery} - The current RQuery instance.
   */
  creditCardInput(onInput) {
    const limit = 19;

    if (!this.#isTagName('input') || this.element.type !== 'text') {
      throw new Error('Element must be an input with type "text"');
    }

    this.element.addEventListener('input', event => {
      let value = event.target.value.replace(/[^0-9]g/, '');

      if (limit) value = value.substring(0, limit);

      event.target.value = formatCardNumberWithDashes(value);

      onInput?.(event.target.value);
    });

    return this;
  }

  /**
   * Find the first element that matches the specified selector within the selected element.
   * @date 06.01.2024 - 16:05:54
   *
   * @param {string | HTMLElement} selector - A CSS selector string or an Element
   * @returns {RQuery} - A new RQuery instance fot the given selector.
   */
  find(selector) {
    const element = new RQuery(this.element.querySelector(selector));

    if (!element) throw new Error(`Element ${selector} not found!`);

    return element;
  }

  /**
   * Append a new element as a child of the selection element.
   * @date 06.01.2024 - 19:42:52
   *
   * @param {string | HTMLElement} childElement
   * @returns {RQuery}
   */
  append(childElement) {
    this.element.appendChild(childElement);

    return this;
  }

  /**
   * Insert a new element before the selection element.
   * @date 06.01.2024 - 19:42:52
   *
   * @param {string | HTMLElement} newElement
   * @returns {RQuery}
   */
  before(newElement) {
    if (!(newElement instanceof HTMLElement)) {
      throw new Error('Element must be an HTMLElement');
    }

    const parentElement = this.element.parentElement;

    if (parentElement) {
      parentElement.insertBefore(newElement, this.element);
    } else {
      throw new Error('Element does not have a parent element');
    }

    return this;
  }

  /**
   * Get or set inner HTML of the selected element.
   * @date 06.01.2024 - 22:24:11
   *
   * @param {string} [htmlContent] - Optional content to set. If not provided, the current inner HTML will be returned.
   * @returns {RQuery | string} - The current RQuery instance for chaining when setting HTML content, or the current inner HTML when getting.
   */
  html(htmlContent) {
    if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML;
		} else {
			this.element.innerHTML = htmlContent;

			return this;
		}
  }

  /**
   * Get or set text content of the selected element.
   * @date 06.01.2024 - 22:24:11
   *
   * @param {string} [textContent] - Optional content to set. If not provided, the current text content will be returned.
   * @returns {RQuery | string} - The current RQuery instance for chaining when setting text content, or the current text content when getting.
   */
  text(textContent) {
    if (!textContent) return this.element.textContent;

    this.element.textContent = textContent;
    
    return this;
  }

  /**
   * Attach a click event listener to the selected element.
   * @date 07.01.2024 - 18:44:45
   *
   * @param {function(Event): void} callback - The event listener function to execute when the selected element is clicked. The function will receive the event object as its atgument.
   * @returns {RQuery} - The current Rquery instance
   */
  click(callback) {
    this.element.addEventListener('click', callback);

    return this;
  }

  /**
   * Change css from element
   * @date 06.01.2024 - 16:13:50
   *
   * @param {string} property
   * @param {string} value
   * @returns {this}
   */
  css(property, value) {
    if (typeof property !== 'string' || typeof value !== 'string') {
      throw new Error('property and value must be strings');
    }

    this.element.style[property] = value;

    return this;
  }

  /**
   * Add the class or a list classes to the current element.
   * @date 07.01.2024 - 18:49:01
   * @param {string | string[]} classNames - A single class name or an array of class names to add to the element.
   * @returns {RQuery} - The current RQuery instance
   */
  addClass(classNames) {
    if (Array.isArray(classNames)) {
      classNames.forEach(name => {
        this.element.classList.add(name);
      });
    } else {
      this.element.classList.add(classNames);
    }

    return this;
  }

  /**
   * Remove the class or a list classes to the current element.
   * @date 07.01.2024 - 18:49:01
   * @param {string | string[]} classNames - A single class name or an array of class names to add to the element.
   * @returns {RQuery} - The current RQuery instance
   */
  removeClass(classNames) {
    if (Array.isArray(classNames)) {
      classNames.forEach(name => {
        this.element.classList.remove(name);
      });
    } else {
      this.element.classList.remove(classNames);
    }

    return this;
  }

  /**
   * Set or get a value of an attr on the selected element.
   * @date 09.01.2024 - 08:48:51
   *
   * @param {string} attrName - The name of the attr to set. 
   * @param {string} [value] - The value to set for the attr. If not provided, current value of the attr will be returned.
   * @returns {RQuery | string} The current RQuery instance (if setting) or attr value (if getting).
   */
  attr(attrName, value) {
    if (typeof attrName !== 'string') {
      throw new Error('Attr name must be a string!');
    }

    if (typeof value === 'undefined') {
      return this.element.getAttribute(attrName);
    } else {
      this.element.setAttribute(attrName, value);

      return this;
    }
  }
}

/**
 * Create a new RQuery instance fot the given selector.
 * @date 06.01.2024 - 16:02:26
 *
 * @export
 * @param {string | HTMLElement} selector - A CSS selector string or an Element
 * @returns {RQuery} - A new RQuery instance fot the given selector.
 */
export function $R(selector) {
  return new RQuery(selector);
}