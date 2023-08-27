import { createAction, createAsyncAction } from "typesafe-actions";
// import { AxiosError } from "axios";
import { authData } from "../../lib/api/auth";
export const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
export const CHANGE_FIELD = "auth/CHANGE_FIELD";
export const LOGIN = "auth/LOGIN";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "auth/LOGIN_FAILURE";
export const JOIN = "auth/JOIN";
export const JOIN_SUCCESS = "auth/JOIN_SUCCESS";
export const JOIN_FAILURE = "auth/JOIN_FAILURE";
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form)();
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value })
)();
export const login = createAsyncAction(LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE)<
  authData,
  string,
  string
>();
export const join = createAsyncAction(JOIN, JOIN_SUCCESS, JOIN_FAILURE)<
  authData,
  string,
  string
>();
