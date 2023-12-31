import { createAsyncAction, createAction } from "typesafe-actions";
import { ListData, ItemData_list } from "../../lib/api/list";
import { SearchData } from "../../lib/api/list";
export const INITIALIZE_FORM = "list/INITIALIZE_FORM";
export const CHANGE_FIELD = "list/CHANGE_FIELD";

export const UPDATE_FIELD = "list/UPDATE_FIELD";
export const UPDATE_FIELD_CLEAN = "list/UPDATE_FIELD_CLEAN";
export const ORIGIN_FIELD_CLEAN = "list/ORIGIN_FIELD_CLEAN";

export const GET_LIST = "list/GET_LIST";
export const GET_LIST_SUCCESS = "list/GET_LIST_SUCCESS";
export const GET_LIST_FAILURE = "list/GET_LIST_FAILURE";
export const SEARCH_LIST = "list/SEARCH_LIST";
export const SEARCH_LIST_SUCCESS = "list/SEARCH_LIST_SUCCESS";
export const SEARCH_LIST_FAILURE = "list/SEARCH_LIST_FAILURE";
export const READ_ITEM = "list/READ_ITEM";
export const READ_ITEM_SUCCESS = "list/READ_ITEM_SUCCESS";
export const READ_ITEM_FAILURE = "list/READ_ITEM_FAILURE";
export const REMOVE_ITEM = "list/REMOVE_ITEM";
export const REMOVE_ITEM_SUCCESS = "list/REMOVE_ITEM_SUCCESS";
export const REMOVE_ITEM_FAILURE = "list/REMOVE_ITEM_FAILURE";

export const UPDATE_IMAGE = "list/UPDATE_IMAGE";
export const UPDATE_IMAGE_SUCCESS = "list/UPDATE_IMAGE_SUCCESS";
export const UPDATE_IMAGE_FAILURE = "list/UPDATE_IMAGE_FAILURE";

export const UPDATE_ITEM = "list/UPDATE_ITEM";
export const UPDATE_ITEM_SUCCESS = "list/UPDATE_ITEM_SUCCESS";
export const UPDATE_ITEM_FAILURE = "list/UPDATE_ITEM_FAILURE";

export const initializeForm = createAction(INITIALIZE_FORM)();
export const changeField = createAction(
  CHANGE_FIELD,
  ({ option, name, value }) => ({
    option,
    name,
    value,
  })
)();

export const updateFieldClean = createAction(UPDATE_FIELD_CLEAN)();
export const originFieldClean = createAction(ORIGIN_FIELD_CLEAN)();
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
)<number, ItemData_list, Error>();
export const removeItem = createAsyncAction(
  REMOVE_ITEM,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAILURE
)<number, ListData, Error>();
export const updateImage = createAsyncAction(
  UPDATE_IMAGE,
  UPDATE_IMAGE_SUCCESS,
  UPDATE_IMAGE_FAILURE
)<FormData, { url: string }[] | null, Error>();
export const updateItem = createAsyncAction(
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE
)<ItemData_list, ListData, Error>();
