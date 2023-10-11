import { createAsyncAction, createAction } from "typesafe-actions";
import { ItemData } from "../../lib/api/item";
export const INITIALIZE_FORM = "item/INITIALIZE_FORM";
export const CHANGE_FIELD = "item/CHANGE_FIELD";
export const ADD_IMAGE = "item/ADD_IMAGE";
export const REMOVE_IMAGE = "item/REMOVE_IMAGE";
export const INPUT_IMAGE = "item/INPUT_IMAGE";
export const INPUT_IMAGE_SUCCESS = "item/INPUT_IMAGE_SUCCESS";
export const INPUT_IMAGE_FAILURE = "item/INPUT_IMAGE_FAILURE";
export const INPUT_ITEM = "item/INPUT_ITEM";
export const INPUT_ITEM_SUCCESS = "item/INPUT_ITEM_SUCCESS";
export const INPUT_ITEM_FAILURE = "item/INPUT_ITEM_FAILURE";
export const RELATE_ITEM='item/RELATE_ITEM'
export const RELATE_ITEM_SUCCESS='item/RELATE_ITEM_SUCCESS'
export const RELATE_ITEM_FAILURE='item/RELATE_ITEM_FAILURE'

export const initializeForm = createAction(INITIALIZE_FORM)();
export const changeField = createAction(CHANGE_FIELD, ({ name, value }) => ({
  name,
  value,
}))();
export const addImage = createAction(
  ADD_IMAGE,
  (image: { url: string }[]) => image
)();
// export const removeImage = createAction(REMOVE_IMAGE, (url) => url)();
export const inputImage = createAsyncAction(
  INPUT_IMAGE,
  INPUT_IMAGE_SUCCESS,
  INPUT_IMAGE_FAILURE
)<FormData, { url: string }[], string>();
export const inputItem = createAsyncAction(
  INPUT_ITEM,
  INPUT_ITEM_SUCCESS,
  INPUT_ITEM_FAILURE
)<ItemData, string, string>();
export const relateItem=createAsyncAction(
  RELATE_ITEM,RELATE_ITEM_SUCCESS,RELATE_ITEM_FAILURE)
  <{targetId:number[],sourceId:number[]},string,string>();
