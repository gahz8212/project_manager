import { createAsyncAction, createAction } from "typesafe-actions";
import { ListData } from "../../lib/api/list";
import { SearchData } from "../../lib/api/list";
export const INITIALIZE_FORM = "list/INITIALIZE_FORM";
export const CHANGE_FIELD = "list/CHANGE_FIELD";
export const GET_LIST = "list/GET_LIST";
export const GET_LIST_SUCCESS = "list/GET_LIST_SUCCESS";
export const GET_LIST_FAILURE = "list/GET_LIST_FAILURE";
export const SEARCH_LIST = "list/SEARCH_LIST";
export const SEARCH_LIST_SUCCESS = "list/SEARCH_LIST_SUCCESS";
export const SEARCH_LIST_FAILURE = "list/SEARCH_LIST_FAILURE";
export const READ_ITEM = "list/READ_ITEM";
export const READ_ITEM_SUCCESS = "list/READ_ITEM_SUCCESS";
export const READ_ITEM_FAILURE = "list/READ_ITEM_FAILURE";
export const initializeForm = createAction(INITIALIZE_FORM)();
export const changeField = createAction(CHANGE_FIELD, ({ name, value }) => ({
  name,
  value,
}))();
export const getList = createAsyncAction(
  GET_LIST,
  GET_LIST_SUCCESS,
  GET_LIST_FAILURE
)<undefined, ListData, Error>();
export const searchList = createAsyncAction(
  SEARCH_LIST,
  SEARCH_LIST_SUCCESS,
  SEARCH_LIST_FAILURE
)<SearchData, ListData, Error>();
export const readItem = createAsyncAction(
  READ_ITEM,
  READ_ITEM_SUCCESS,
  READ_ITEM_FAILURE
)<number, ListData, Error>();
