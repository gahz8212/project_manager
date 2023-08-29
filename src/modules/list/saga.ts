import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as listAPI from "../../lib/api/list";
import { ItemData } from "../../lib/api/item";
export function* listSaga() {
  yield takeLatest(actions.READ_ITEM, readItemSaga);
  yield takeLatest(actions.GET_LIST, getListSaga);
  yield takeLatest(actions.SEARCH_LIST, searchListSaga);
}
function* readItemSaga(action: ReturnType<typeof actions.readItem.request>) {
  try {
    const response: { data: ItemData } = yield call(
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
    const response: { data: ItemData[] } = yield call(listAPI.getList);
    yield put(actions.getList.success(response.data));
  } catch (e: any) {
    yield put(actions.getList.failure(e.response));
  }
}
function* searchListSaga(
  action: ReturnType<typeof actions.searchList.request>
) {
  try {
    const response: { data: ItemData[] } = yield call(
      listAPI.searchList,
      action.payload
    );
    yield put(actions.searchList.success(response.data));
  } catch (e: any) {
    yield put(actions.searchList.failure(e.response));
  }
}
