import { createAsyncAction, createAction } from "typesafe-actions";
import { ItemData } from "../../lib/api/item";
export const INITIALIZE_FORM = "list/INITIALIZE_FORM";
export const CHANGE_FIELD = "list/CHANGE_FIELD";
export const GET_LIST = "list/GET_LIST";
export const GET_LIST_SUCCESS = "list/GET_LIST_SUCCESS";
export const GET_LIST_FAILURE = "list/GET_LIST_FAILURE";
export const GET_ITEM = "list/GET_ITEM";
export const GET_ITEM_SUCCESS = "list/GET_ITEM_SUCCESS";
export const GET_ITEM_FAILURE = "list/GET_ITEM_FAILURE";
export const initializeForm = createAction(INITIALIZE_FORM, () => {});
export const changeField = createAction(CHANGE_FIELD, ({ name, value }) => ({
  name,
  value,
}));
export const getList = createAsyncAction(
  GET_LIST,
  GET_LIST_SUCCESS,
  GET_LIST_FAILURE
)<undefined, ItemData[], string>();
export const getItem = createAsyncAction(
  GET_ITEM,
  GET_ITEM_SUCCESS,
  GET_ITEM_FAILURE
)<undefined, ItemData, string>();
