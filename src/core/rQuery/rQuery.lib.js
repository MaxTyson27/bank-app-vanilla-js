import { INPUT_TYPES } from "@/constants/input-types.const";
import { VARIANTS } from "@/constants/variants.const";
import { formatCardNumberWithDashes } from "@/utils/format/format-card-number";

/**
 * Represents the RQuery class for working with DOM-elements.
 * @class RQuery
 * @typedef {RQuery}
 */
class RQuery {
  /**
   * Creates an instance of RQuery.
   * @constructor
   * @param {string | HTMLElement} selector
   */
  constructor(selector) {
    if (typeof selector === 'string') {
      this.element = document.querySelector(selector);

      if (!this.element) {
        throw new Error(`Element ${selector} not found!`);
      }
    } else if (selector instanceof HTMLElement || SVGElement) {
      this.element = selector;
    } else {
      throw new Error('Invalid selector type.');
    }
  }

  /**
   * Check current element tag name.
   * @param {string} tagName - The tag name for checking.
   * @returns {boolean} - Boolean result checking.
   */
  #isTagName(tagName) {
    return this.element.tagName.toLowerCase() === tagName;
  }

  /**
   * Set attributes and event listeners for an input element.
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
   * @param {string | HTMLElement} selector - A CSS selector string or an Element
   * @returns {RQuery} - A new RQuery instance fot the given selector.
   */
  find(selector) {
    const element = new RQuery(this.element.querySelector(selector));

    if (!element) throw new Error(`Element ${selector} not found!`);

    return element;
  }

  /**
   * Find the all element that matches the specified selector within the selected element.
   * @param {string | HTMLElement} selector - A CSS selector string or an Element
   * @returns {Array<RQuery>} A new Array with all elements fot the given selector.
   */
  findAll(selector) {
    const elements = this.element.querySelectorAll(selector);

    if (!elements || !elements.length) throw new Error(`Element ${selector} not found!`);

    return [...elements].map(elem => new RQuery(elem));
  }

  /**
   * Append a new element as a child of the selection element.
   * @param {string | HTMLElement} childElement
   * @returns {RQuery}
   */
  append(childElement) {
    this.element.appendChild(childElement);

    return this;
  }

  /**
   * Insert a new element before the selection element.
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
   * @param {function(Event): void} callback - The event listener function to execute when the selected element is clicked. The function will receive the event object as its atgument.
   * @returns {RQuery} - The current Rquery instance.
   */
  click(callback) {
    this.element.addEventListener('click', callback);

    return this;
  }

  /**
   * @returns {RQuery} - The current Rquery instance.
   */
  show() {
    this.element.style.removeProperty('display');

    return this;
  }

  /**
   * @returns {RQuery} - The current Rquery instance.
   */
  hide() {
    this.element.style.display = 'none';

    return this;
  }

  /**
   * Change css from element
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

  /**
   * Removes an attr from the current element.
   * @param {string} attrName - The attr's name, will be removed.
   * @returns {RQuery} - A new RQuery instance fot the given selector.
   */
  removeAttr(attrName) {
    if (typeof attrName !== 'string') {
      throw new Error('Attr name must be a string!');
    }

    this.element.removeAttribute(attrName);

    return this;
  }

 /**
	 * Gets or sets the value of an input element.
	 * @param {string} [newValue] - The new value to set for the input element. If not provided, the method returns the current value.
	 * @return {string|RQuery} - If newValue is provided, returns the RQuery instance. Otherwise, returns the current value of the input element.
	 */
 value(newValue) {
  if (typeof newValue === 'undefined') {
    return this.element.value;
  } else {
    this.element.value = newValue;

    return this;
  }
}

  /**
   * Set an event listener for the submit event of a form element.
   * @param {function(Event): void} onSubmit - The event listener for the form's submit event.
   * @returns {RQuery} - A new RQuery instance fot the given selector.
   */
  submit(onSubmit) {
    if (!this.#isTagName('form')) throw new Error('Element must be a form');

    this.element.addEventListener('submit', event => {
      event.preventDefault();
      onSubmit(event);
    });

    return this;
  }

  /**
	 * Add an event listener to the selected element for the specified event type.
	 * @param {string} eventType - The type of event to listen for (e.g., 'click', 'input', etc.).
	 * @param {function(Event): void} callback - The event listener function to execute when the event is triggered. The function will receive the event object as its argument.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	on(eventType, callback) {
		if (typeof eventType !== 'string' || typeof callback !== 'function') {
			throw new Error(
				'eventType must be a string and callback must be a function'
			);
		}

		this.element.addEventListener(eventType, callback);

		return this;
	}
}

/**
 * Create a new RQuery instance fot the given selector.
 * @export
 * @param {string | HTMLElement} selector - A CSS selector string or an Element
 * @returns {RQuery} - A new RQuery instance fot the given selector.
 */
export function $R(selector) {
  return new RQuery(selector);
}