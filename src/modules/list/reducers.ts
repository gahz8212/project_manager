import { createReducer } from "typesafe-actions";
import { listState, listAction } from "./types";

import * as actions from "./actions";
const initialState: listState = {
  loading: false,
  error: null,
  originalItem: {
    id: 0,
    category: "",
    name: "",
    description: "",
    unit: "",
    price: 0,
    departs: "",
    count: 0,
    use: true,
    Images: null,
  },
  // item: null,
  updateImages: null,
  list: [],
  search: {
    category: "",
    name: "",
    description: "",
    unit: "",
    departs: [],
    use: true,
  },
};
const list = createReducer<listState, listAction>(initialState, {
  [actions.INITIALIZE_FORM]: () => ({
    ...initialState,
  }),
  [actions.CHANGE_FIELD]: (state, { payload: { option, name, value } }) => {
    console.log(name, value);
    return {
      ...state,
      [option]: { ...state[option], [name]: value },
    };
  },

  [actions.UPDATE_FIELD_CLEAN]: (state) => {
    return {
      ...state,
      updateImages: null,
    };
  },
  [actions.ORIGIN_FIELD_CLEAN]: (state) => {
    return {
      ...state,
      originalItem: initialState.originalItem,
    };
  },
  [actions.GET_LIST]: (state) => ({
    ...state,
    loading: true,
  }),
  [actions.GET_LIST_SUCCESS]: (state, { payload: list }) => ({
    ...state,
    loading: false,
    list,
    error: null,
  }),
  [actions.GET_LIST_FAILURE]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error,
    list: [],
  }),
  [actions.SEARCH_LIST]: (state) => ({
    ...state,
    loading: true,
  }),
  [actions.SEARCH_LIST_SUCCESS]: (state, { payload: list }) => ({
    ...state,
    loading: false,
    list,
    error: null,
  }),
  [actions.SEARCH_LIST_FAILURE]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error,
    list: [],
  }),
  [actions.READ_ITEM]: (state) => ({
    ...state,
    loading: true,
  }),
  [actions.READ_ITEM_SUCCESS]: (state, { payload: originalItem }) => ({
    ...state,
    loading: false,
    originalItem,
    error: null,
  }),
  [actions.READ_ITEM_FAILURE]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error,
    item: null,
  }),
  [actions.REMOVE_ITEM]: (state) => ({
    ...state,
    loading: true,
  }),
  [actions.REMOVE_ITEM_SUCCESS]: (state, { payload: list }) => ({
    ...state,
    loading: false,
    list,
    error: null,
  }),
  [actions.REMOVE_ITEM_FAILURE]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error,
    list: [],
  }),
  [actions.UPDATE_IMAGE]: (state) => ({
    ...state,
    loading: true,
  }),
  [actions.UPDATE_IMAGE_SUCCESS]: (state, { payload: updateImages }) => ({
    ...state,
    loading: false,
    updateImages: updateImages,
  }),
  [actions.UPDATE_IMAGE_FAILURE]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    updateImages: null,
    error,
  }),
  [actions.UPDATE_ITEM]: (state) => ({
    ...state,
    loading: true,
  }),
  [actions.UPDATE_ITEM_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    error: null,
  }),
  [actions.UPDATE_ITEM_FAILURE]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error,
  }),
});
export default list;
