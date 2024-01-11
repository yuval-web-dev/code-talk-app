import { nanoid } from "@reduxjs/toolkit";
import { createAppSlice } from "facades/toolkit";
import { authAPI } from "../common/axios";

export const SLICE_NAME = "signIn";

const INITIAL_STATE = {
  loading: false,
  payload: null,
  ok: null,
  error: null,
};

// https://redux-toolkit.js.org/api/createSlice
export const signInSlice = createAppSlice({
  name: SLICE_NAME,
  initialState: INITIAL_STATE,
  reducers: (create) => ({
    getConfig: create.asyncThunk(
      async ({ username, password }, thunkApi) => {
        const res = await authAPI.post("/sign-in", { username, password });
        return res.data.config;
      },
      {
        pending: (state, action) => {
          state.loading = true;
        },
        settled: (state, action) => {
          state.loading = false;
        },
        rejected: (state, action) => {
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
        fulfilled: (state, action) => {
          state.ok = true;
        },
        options: {
          idGenerator: nanoid,
        },
      },
    ),
  }),
  selectors: {
    selectOk: (state) => state.ok,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});

export const { selectLoading, selectError, selectOk } = signInSlice.selectors;
export const { getConfig } = signInSlice.actions;