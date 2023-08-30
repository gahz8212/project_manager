import { createReducer } from "typesafe-actions";
import { listState, listAction } from "./types";

import * as actions from "./actions";
const initialState: listState = {
  loading: false,
  error: null,
  list: [],
  item: null,
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
  [actions.CHANGE_FIELD]: (state, { payload: { name, value } }) => ({
    ...state,
    search: { ...state.search, [name]: value },
  }),
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
});
export default list;
