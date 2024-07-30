import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./api/auth.api";
import authSlice from "./slice/authSlice";
import { messApi } from "./api/mess.api";

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [messApi.reducerPath]: messApi.reducer,
  authSlice: authSlice.reducer,
})