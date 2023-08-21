import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import auth, { authSaga } from "./auth/index";
import user, { userSaga } from "./user/index";
import item, { itemSaga } from "./item/index";

const rootReducer = combineReducers({ auth, user, item });
export function* rootSaga() {
  yield all([authSaga(), userSaga(), itemSaga()]);
}
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
