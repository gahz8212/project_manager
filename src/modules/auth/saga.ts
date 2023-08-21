import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as authAPI from "../../lib/api/auth";
export function* authSaga() {
  yield takeLatest(actions.LOGIN, loginSaga);
  yield takeLatest(actions.JOIN, joinSaga);
}
function* loginSaga(action: ReturnType<typeof actions.login.request>) {
  try {
    const response: { data: string } = yield call(
      authAPI.login,
      action.payload
    );
    yield put(actions.login.success(response.data));
  } catch (e: any) {
    yield put(actions.login.failure(e));
  }
}
function* joinSaga(action: ReturnType<typeof actions.join.request>) {
  try {
    const response: { data: string } = yield call(authAPI.join, action.payload);
    yield put(actions.join.success(response.data));
  } catch (e: any) {
    yield put(actions.join.failure(e));
  }
}
