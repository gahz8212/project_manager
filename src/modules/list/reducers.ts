import { createReducer } from "typesafe-actions";
import { listState, listAction } from "./types";

import * as actions from "./actions";
const initialState: listState = {
  loading: false,
  error: null,
  item: null,
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
  [actions.CHANGE_FIELD]: (state, { payload: { name, value } }) => {
    console.log(name, value);
    return {
      ...state,
      search: { ...state.search, [name]: value },
    };
  },
  [actions.UPDATE_FIELD]: (state, { payload: { name, value } }) => {
    console.log(name, value);
    return {
      ...state,
      item: { ...state.item, [name]: value },
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
  [actions.READ_ITEM_SUCCESS]: (state, { payload: item }) => ({
    ...state,
    loading: false,
    item,
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
});
export default list;
