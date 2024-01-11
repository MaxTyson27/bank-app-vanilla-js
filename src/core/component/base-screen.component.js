import { getTitle } from "@/config/seo.config";
import { ChildComponent } from "./child.component";

export class BaseScreen extends ChildComponent {
  /**
   * Creates an instance of BaseScreen.
   * @date 06.01.2024 - 00:00:15
   *
   * @param {{ title: string; }} props - The props for the BaseScreen
   * @param {string} props.title - The title for the screen
   */
  constructor({title}) {
    super();

    document.title = getTitle(title);
  }
}