import { createReducer } from "typesafe-actions";
import * as actions from "./actions";
import { userState, userAction } from "./type";
const initialState: userState = {
  user: null,
  error: null,
};
const user = createReducer<userState, userAction>(initialState, {
  [actions.CHECK_SUCCESS]: (state, { payload: user }) => ({
    ...state,
    user,
    error: null,
  }),
  [actions.CHECK_FAILURE]: (state, { payload: error }) => ({
    ...state,
    user: null,
    error,
  }),
  [actions.SET_TEMP_USER]: (state, { payload: user }) => ({
    ...state,
    user,
  }),
  [actions.LOGOUT]: (state) => ({
    ...state,
    user: null,
  }),
});
export default user;
