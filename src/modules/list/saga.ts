import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as listAPI from "../../lib/api/list";
import { ListData } from "../../lib/api/list";
export function* listSaga() {
  yield takeLatest(actions.READ_ITEM, readItemSaga);
  yield takeLatest(actions.GET_LIST, getListSaga);
  yield takeLatest(actions.SEARCH_LIST, searchListSaga);
  yield takeLatest(actions.REMOVE_ITEM, removeItemSaga);
}
function* removeItemSaga(
  action: ReturnType<typeof actions.removeItem.request>
) {
  try {
    const response: { data: ListData } = yield call(
      listAPI.removeItem,
      action.payload
    );
    yield put(actions.removeItem.success(response.data));
  } catch (e: any) {
    yield put(actions.removeItem.failure(e.response));
  }
}
function* readItemSaga(action: ReturnType<typeof actions.readItem.request>) {
  try {
    const response: { data: ListData } = yield call(
      listAPI.readItem,
      action.payload
    );
    yield put(actions.readItem.success(response.data));
  } catch (e: any) {
    yield put(actions.readItem.failure(e.response));
  }
}
function* getListSaga() {
  try {
    const response: { data: ListData } = yield call(listAPI.getList);
    yield put(actions.getList.success(response.data));
  } catch (e: any) {
    yield put(actions.getList.failure(e.response));
  }
}
function* searchListSaga(
  action: ReturnType<typeof actions.searchList.request>
) {
  try {
    const response: { data: ListData } = yield call(
      listAPI.searchList,
      action.payload
    );
    yield put(actions.searchList.success(response.data));
  } catch (e: any) {
    yield put(actions.searchList.failure(e.response));
  }
}
