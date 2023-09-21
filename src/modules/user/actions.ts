import { createAction, createAsyncAction } from "typesafe-actions";
export const CHECK = "user/CHECK";
export const CHECK_SUCCESS = "user/CHECK_SUCCESS";
export const CHECK_FAILURE = "user/CHECK_FAILURE";
export const SET_TEMP_USER = "user/SET_TEMP_USER";
export const LOGOUT = "user/LOGOUT";
export const GET_USERS = "user/GET_USERS";
export const GET_USERS_SUCCESS = "user/GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "user/GET_USERS_FAILURE";
export const check = createAsyncAction(CHECK, CHECK_SUCCESS, CHECK_FAILURE)<
  undefined,
  { id: number; name: string; rank: string } | null,
  Error
>();
export const tempSetUser = createAction(SET_TEMP_USER, (user) => user)();
export const logout = createAction(LOGOUT, (id) => id)();
export const getUsers = createAsyncAction(
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE
)<undefined, { id: number; name: string; rank: string }[], Error>();
