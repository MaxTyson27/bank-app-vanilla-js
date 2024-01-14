import { getTitle } from "@/config/seo.config";
import { ChildComponent } from "./child.component";

export class BaseScreen extends ChildComponent {
  /**
   * Creates an instance of BaseScreen.
   * @param {{ title: string; }} props - The props for the BaseScreen
   * @param {string} props.title - The title for the screen
   */
  constructor({title}) {
    super();

    document.title = getTitle(title);
  }
}