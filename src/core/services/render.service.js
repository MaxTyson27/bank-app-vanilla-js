import { ChildComponent } from "../component/child.component";

class RenderService {
  /**
   * htmlToElement method
   * @param {string} html
   * @param {Array} [components=[]]
   * @param {Object} [styles]
   * @returns {HTMLElement}
   */
  htmlToElement(html, components = [], styles) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const element = doc.body.firstChild;

    this.#applyModuleStyles(styles, element);
    this.#replaceComponentTags(element, components);

    return element;
  }

  /**
   * applyModuleStyles method
   * @param {Object} moduleStyles
   * @param {string} element
   * @returns {void}
   */
  #applyModuleStyles(moduleStyles, element) {
    if (!element) return;

    const applyStyles = element => {
      for (const [key, value] of Object.entries(moduleStyles)) {
        if (element.classList.contains(key)) {
          element.classList.add(value);
          element.classList.remove(key);
        }
      }
    };

    if (element.getAttribute('class')) applyStyles(element);

    const childElements = element.querySelectorAll('*');
    childElements.forEach(applyStyles);
  }

  /**
   * replaceComponentTags method
   * @param {HTMLElement} parentElement
   * @param {Array} components
   * @returns {void}
   */
  #replaceComponentTags(parentElement, components) {
    const componentTagPattern = /^component-/;
    const allElements = parentElement.getElementsByTagName('*');

    for (const element of allElements) {
      const elementTagName = element.tagName.toLowerCase();

      if (componentTagPattern.test(elementTagName)) {
        const componentName = elementTagName
        .replace(componentTagPattern, '')
        .replace(/-/g, '');

        const foundedComponent = components.find(Component => {
          const instance = Component instanceof ChildComponent
            ? Component
            : new Component();

          return instance.constructor.name.toLowerCase() === componentName;
        });

        if (foundedComponent) {
          const componentContent = foundedComponent instanceof ChildComponent
            ? foundedComponent.render()
            : new foundedComponent().render();

          element.replaceWith(componentContent);
        } else {
          console.error(
            `Component "${componentName}" not found in the provided components array.`
          );
        }
      }
    }
  }
}

export default new RenderService();