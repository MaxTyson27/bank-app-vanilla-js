import { NotFound } from "@/components/screens/not-found/not-found.component";
import { ROUTES } from "./routes.data";
import { Layout } from "@/components/layout/layout.component";
import { $R } from "../rQuery/rQuery.lib";

export class Router {
  #routes = ROUTES;
  #currentRoute = null;
  #layout = null;

  constructor() {
    window.addEventListener('popstate', () => {
      this.#handleChangeRoute();
    });

    this.#handleChangeRoute();
    this.#handleLinks();
  }

  getCurrentPath() {
    return window.location.pathname;
  }

  navigate(path) {
    if (path === this.getCurrentPath()) return;

    window.history.pushState({}, '', path);
    this.#handleChangeRoute();
  }

  #handleLinks() {
    document.addEventListener('click', event => {
      const target = event.target.closest('a');

      if (!target) return;

      event.preventDefault();
      this.navigate(target.href);
    });
  }

  #handleChangeRoute() {
    const currentPath = this.getCurrentPath() || '/';

    let route = this.#routes.find(({ path }) => path === currentPath);

    if (!route) {
      route = {
        component: NotFound,
      };
    }

    this.#currentRoute = route;
    this.#render();
  }

  #render() {
    const component = new this.#currentRoute.component().render();

    if (!this.#layout) {
      this.#layout = new Layout({
        router: this,
        children: component,
      }).render();

      $R('#app').append(this.#layout);

      return;
    }

    $R('#content').html('').append(component);
  }
}