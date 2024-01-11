import { nanoid } from "@reduxjs/toolkit";
import { createAppSlice } from "facades/toolkit";
import { authAPI } from "../common/axios";

export const signOutSlice = createAppSlice({
  name: "signOut",
  initialState: {
    loading: false,
    ok: null,
    error: null,
  },
  reducers: (create) => ({
    requestSignOut: create.asyncThunk(
      async ({ bearerToken }, thunkApi) => {
        await authAPI.post(
          "/sign-out",
          {},
          { headers: { Authorization: bearerToken } },
        );
      },
      {
        pending: (state, action) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.ok = false;
          // const axiosErrCode = action.error.code;
          // switch (axiosErrCode) {
          //   case "ERR_BAD_REQUEST":
          //     state.error = {
          //       cause: `Client-side error occurred (${axiosErrCode})`,
          //       additional: "You may have entered bad credentials.",
          //     };
          //     break;
          //   case "ERR_NETWORK":
          //   case "ERR_BAD_RESPONSE":
          //     state.error = {
          //       cause: `Server-side error occurred (${axiosErrCode})`,
          //     };
          //     break;
          //   default:
          //     state.error = {
          //       cause: "Unknown error occurred.",
          //     };
          // }
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.ok = true;
        },
        options: {
          idGenerator: nanoid,
        },
      },
    ),
  }),
  selectors: {
    selectLoading: (state) => state.loading,
    selectOk: (state) => state.ok,
    selectError: (state) => state.error,
  },
});

export const { selectLoading, selectError, selectOk } = signOutSlice.selectors;
export const { requestSignOut } = signOutSlice.actions;
