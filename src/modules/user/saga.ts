import { takeLatest, put, call } from "redux-saga/effects";
import * as actions from "./actions";
import * as userAPI from "../../lib/api/auth";
export function* userSaga() {
  yield takeLatest(actions.CHECK, checkSaga);
  yield takeLatest(actions.LOGOUT, logoutSaga);
  yield takeLatest(actions.CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(actions.GET_USERS, getUserSaga);
}
function* getUserSaga() {
  try {
    const response: { data: { id: number; name: string; rank: string }[] } =
      yield call(userAPI.getUsers);
    yield put(actions.getUsers.success(response.data));
  } catch (e: any) {
    yield put(actions.getUsers.failure(e));
  }
}
function* checkSaga(action: ReturnType<typeof actions.check.request>) {
  try {
    const response: { data: { id: number; name: string; rank: string } } =
      yield call(userAPI.check);
    yield put(actions.check.success(response.data));
  } catch (e: any) {
    yield put(actions.check.failure(e));
  }
}
function* logoutSaga() {
  yield call(userAPI.logout);
  try {
    localStorage.removeItem("user");
  } catch (e: any) {
    console.log("local storage is not working");
  }
}
function checkFailureSaga() {
  try {
    localStorage.removeItem("user");
  } catch (e: any) {
    console.log("local storage is not working");
  }
}
