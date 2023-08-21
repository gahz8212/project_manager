import { createReducer } from "typesafe-actions";
import { authState, authAction } from "./type";
import * as actions from "./actions";
const initialState: authState = {
  loading: false,
  error: null,
  auth: "",
  login: { email: "", password: "" },
  join: { email: "", password: "", name: "", rank: "" },
};
const auth = createReducer<authState, authAction>(initialState, {
  [actions.INITIALIZE_FORM]: (state, { payload: form }) => ({
    ...state,
    [form]: initialState[form],
    auth: "",
    error: null,
  }),
  [actions.CHANGE_FIELD]: (state, { payload: { form, key, value } }) => ({
    ...state,
    [form]: { ...state[form], [key]: value },
  }),
  [actions.LOGIN]: (state) => ({
    ...state,
    loading: true,
  }),
  [actions.LOGIN_SUCCESS]: (state, { payload: auth }) => ({
    ...state,
    auth,
    error: null,
    loading: false,
  }),
  [actions.LOGIN_FAILURE]: (state, { payload: error }) => ({
    ...state,
    auth: "",
    error: error,
    loading: false,
  }),
  [actions.JOIN]: (state) => ({
    ...state,
    loading: true,
  }),
  [actions.JOIN_SUCCESS]: (state, { payload: auth }) => ({
    ...state,
    auth,
    error: null,
    loading: false,
  }),
  [actions.JOIN_FAILURE]: (state, { payload: error }) => ({
    ...state,
    auth: "",
    error: error,
    loading: false,
  }),
});
export default auth;
