import { COLORS } from "@/config/colors.config";

export class ValidationService {
  constructor() {
    this.errorBorderTimeout = {};
  }

  showEror(element, timeout = 2500) {
    element.css('border-color', COLORS.error);

    if (this.errorBorderTimeout[element]) {
      clearTimeout(this.errorBorderTimeout[element]);
    }

    this.errorBorderTimeout[element] = setTimeout(() => {
      element.css('border-color', '');
    }, timeout);

  }
}
