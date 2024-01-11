import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { signInSlice } from "features/auth/signIn/signInSlice";
import { signOutSlice } from "features/auth/signOut/signOutSlice";
import { signUpSlice } from "features/auth/signUp/signUpSlice";

const reducer = combineSlices(signInSlice, signOutSlice, signUpSlice);

export const store = configureStore({
  reducer,
  devTools: true,
});
