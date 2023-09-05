import { createReducer } from "typesafe-actions";
import { itemState, itemAction } from "./types";

import * as actions from "./actions";
const initialState: itemState = {
  loading: false,
  images: null,
  error: "",
  status: "",
  item: {
    category: "소프트웨어",
    name: "",
    description: "",
    unit: "￦",
    price: 0,
    departs: [
      { depart: "Off", count: 1 },
      { depart: "Dev", count: 0 },
      { depart: "Fac", count: 0 },
      { depart: "Pac", count: 0 },
    ],
    use: true,
    images: null,
  },
};
const item = createReducer<itemState, itemAction>(initialState, {
  [actions.INITIALIZE_FORM]: () => ({
    ...initialState,
  }),
  [actions.CHANGE_FIELD]: (state, { payload: { name, value } }) => ({
    ...state,
    item: { ...state.item, [name]: value },
  }),
  [actions.ADD_IMAGE]: (state, { payload: images }) => ({
    ...state,
    item: { ...state.item, images },
  }),

  [actions.INPUT_IMAGE]: (state) => ({
    ...state,
    loading: true,
  }),
  [actions.INPUT_IMAGE_SUCCESS]: (state, { payload: images }) => ({
    ...state,
    loading: false,
    images,
  }),
  [actions.INPUT_IMAGE_FAILURE]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error,
  }),
  [actions.INPUT_ITEM]: (state) => ({
    ...state,
    loading: true,
  }),
  [actions.INPUT_ITEM_SUCCESS]: (state, { payload: status }) => ({
    ...state,
    loading: false,
    status,
  }),
  [actions.INPUT_ITEM_FAILURE]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error,
  }),
});
export default item;
