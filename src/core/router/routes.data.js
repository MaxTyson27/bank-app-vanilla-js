import { Home } from "@/components/screens/home/home.component";
import { Auth } from "@/components/screens/auth/auth.component";
// import { AboutUs } from "@/components/screens/about-us/about-us.component";

export const ROUTES = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/auth',
    component: Auth,
  },
  // {
  //   path: '/about-us',
  //   component: AboutUs,
  // }
];