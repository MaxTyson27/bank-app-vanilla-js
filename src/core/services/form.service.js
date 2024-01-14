import { $R } from "../rQuery/rQuery.lib";

/**
 * Service working with forms
 * @export
 * @class FormService
 * @typedef {FormService}
 */
export class FormService {
  /**
   * Collects all inputs from the received form into a single object
   *
   * @param {HTMLFormElement} formElement - The form from which inputs need to be processed
   * @returns {Object} Returns a prepared data object
   */
  prepareFields(formElement) {
    const allFields = $R(formElement).findAll('input');

    const preparedFields = allFields.reduce((acc, instance) => {
      acc[instance.element.name] = instance.element.value;

      return acc;
    }, {});

    return preparedFields;    
  }
}
