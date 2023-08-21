import { createAction, createAsyncAction } from "typesafe-actions";
export const CHECK = "user/CHECK";
export const CHECK_SUCCESS = "user/CHECK_SUCCESS";
export const CHECK_FAILURE = "user/CHECK_FAILURE";
export const SET_TEMP_USER = "user/SET_TEMP_USER";
export const LOGOUT = "user/LOGOUT";
export const check = createAsyncAction(CHECK, CHECK_SUCCESS, CHECK_FAILURE)<
  undefined,
  { id: number; name: string; rank: string } | null,
  Error
>();
export const tempSetUser = createAction(SET_TEMP_USER, (user) => user)();
export const logout = createAction(LOGOUT)();
