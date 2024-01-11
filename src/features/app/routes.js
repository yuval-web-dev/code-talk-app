import { About } from "./About";
import { Home } from "./Home";

export const appRoutes = {
  home: {
    path: "/",
    element: <Home />,
  },
  about: {
    path: "/about",
    element: <About />,
  },
};
