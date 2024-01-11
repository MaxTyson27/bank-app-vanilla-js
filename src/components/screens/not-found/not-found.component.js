import { BaseScreen } from "@/core/component/base-screen.component";

export class NotFound extends BaseScreen {
  constructor() {
    super({title: 'NotFound'});
  }

  render() {
    return '<p>Not Found</p>';
  }
}