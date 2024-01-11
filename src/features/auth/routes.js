import {SignIn} from "./signIn/SignIn";
import {SignOut} from "./signOut/SignOut";
import {SignUp} from "./signUp/SignUp";

export const authRoutes = {
  signIn: {
    path: "/sign-in",
    element: <SignIn />,
  },
  signOut: {
    path: "/sign-out",
    element: <SignOut />,
  },
  signUp: {
    path: "/sign-up",
    element: <SignUp />,
  },
};
