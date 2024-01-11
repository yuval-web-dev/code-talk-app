import { nanoid } from "@reduxjs/toolkit";
import { createAppSlice } from "facades/toolkit";
import { authAPI } from "../common/axios";

// https://redux-toolkit.js.org/api/createSlice
export const signUpSlice = createAppSlice({
  name: "signUp",
  initialState: {
    loading: false,
    ok: null,
    error: null,
  },
  reducers: (create) => ({
    createAccount: create.asyncThunk(
      async ({ username, password, email }, thunkApi) => {
        await authAPI.post("/sign-up", { username, password, email });
      },
      {
        pending: (state, action) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.ok = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.ok = false;
          const axiosErrCode = action.error.code;
          switch (axiosErrCode) {
            case "ERR_BAD_REQUEST":
              state.error = {
                info: `Client-side error (${axiosErrCode})`,
              };
              break;
            case "ERR_NETWORK":
            case "ERR_BAD_RESPONSE":
              state.error = {
                info: `Server-side error (${axiosErrCode})`,
              };
              break;
            default:
              state.error = {
                info: `Unknown error (${axiosErrCode})`,
              };
          }
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

export const { selectLoading, selectError, selectOk } = signUpSlice.selectors;
export const { createAccount } = signUpSlice.actions;
